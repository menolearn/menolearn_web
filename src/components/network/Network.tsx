"use client"
import {
  Edge,
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  NodeMouseHandler,
  useReactFlow,
  BackgroundVariant,
  useNodesInitialized,
  Panel,
  NodeChange,
  NodeDimensionChange,
} from "@xyflow/react"
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
} from "d3-force"

import "@xyflow/react/dist/style.css"

import { allNodes } from "@/data/nodes"
import {
  DragEvents,
  HandleObject,
  NetworkNodeType,
  NodeCategory,
  UseLayoutedElementsReturn,
} from "@/types"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import NetworkNode from "./NetworkNode"
import collide from "./collide"
import NavButton from "./NavButton"
import { ArrowLeft, ArrowRight } from "lucide-react"

const getEdgesFromNodes = (nodes: NetworkNodeType[]): Edge[] => {
  return nodes.flatMap((node) => {
    return node.connectsTo
      .map((targetId) => {
        const targetNode = nodes.find((n) => n.id == targetId)
        if (!targetNode) return null

        return {
          id: `e${node.id}-${targetId}`,
          source: node.id,
          target: targetId,
          style: { stroke: "#7FB0CD", strokeWidth: 2 }, //  edge color
        }
      })
      .filter(Boolean) as Edge[]
  })
}

const simulation = forceSimulation()
  .force("charge", forceManyBody().strength(-1600))
  .force("x", forceX().x(0).strength(0.03))
  .force("y", forceY().y(0).strength(0.03))
  .force("collide", collide())
  .alphaTarget(0.05)
  .stop()

const useLayoutedElements = (): UseLayoutedElementsReturn => {
  const { getNodes, setNodes, getEdges, fitView } = useReactFlow()
  const initialized = useNodesInitialized()

  // You can use these events if you want the flow to remain interactive while
  // the simulation is running. The simulation is typically responsible for setting
  // the position of nodes, but if we have a reference to the node being dragged,
  // we use that position instead.
  const draggingNodeRef = useRef<NetworkNodeType | null>(null)
  const dragEvents: DragEvents = useMemo(
    () => ({
      start: (_event: React.MouseEvent, node: NetworkNodeType) => {
        draggingNodeRef.current = node
      },

      drag: (_event: React.MouseEvent, node: NetworkNodeType) => {
        draggingNodeRef.current = node
      },
      stop: (_event: React.MouseEvent) => {
        draggingNodeRef.current = null
      },
    }),
    [],
  )

  let nodes = (getNodes() as NetworkNodeType[]).map((node) => ({
    ...node,
    x: node.position.x,
    y: node.position.y,
  }))
  let edges = getEdges()
  let running = false

  return useMemo(() => {
    // If React Flow hasn't initialized our nodes with a width and height yet, or
    // if there are no nodes in the flow, then we can't run the simulation!
    if (!initialized || nodes.length == 0) return [false, null, dragEvents]

    simulation.nodes(nodes).force(
      "link",
      forceLink(edges)
        .id((d: any) => d.id)
        .strength(0.02)
        .distance(200),
    )

    console.log("memo nodes", nodes)
    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.
    const tick = () => {
      const tickNodes = getNodes() as NetworkNodeType[]

      console.log("original nodes", nodes)
      console.log("tick nodes", tickNodes)

      nodes.forEach((nd, i) => {
        const dragging = draggingNodeRef.current?.id == nd.id

        // Setting the fx/fy properties of a node tells the simulation to "fix"
        // the node at that positionx and ignore any forces that would normally
        // cause it to move.
        if (dragging && draggingNodeRef.current) {
          console.log("dragged")
          nodes[i].fx = draggingNodeRef.current.position.x
          nodes[i].fy = draggingNodeRef.current.position.y
        } else {
          // TODO: Fix nodes not being updated after adding nodes
          delete nodes[i].fx
          delete nodes[i].fy
        }
      })

      simulation.tick()
      setNodes(
        nodes.map((node) => {
          return {
            ...node,
            position: { x: node.fx ?? node.x, y: node.fy ?? node.y },
            x: node.fx ?? node.x!,
            y: node.fy ?? node.y!,
          }
        }),
      )

      window.requestAnimationFrame(() => {
        fitView()

        if (running) tick()
      })
    }

    const toggle = () => {
      running = !running
      running && window.requestAnimationFrame(tick)

      console.log("Running ", running)
    }

    const isRunning = () => running

    return [true, { toggle, isRunning }, dragEvents]
  }, [initialized, dragEvents, getNodes, getEdges, setNodes, fitView])
}

const initialNodes: NetworkNodeType[] = allNodes.filter(
  (node) => node.data.category == NodeCategory.initial,
)

const initialEdges: Edge[] = getEdgesFromNodes(initialNodes)

function Network() {
  const { setCenter } = useReactFlow<NetworkNodeType, Edge>()

  const [nodes, setNodes, onNodesChange] =
    useNodesState<NetworkNodeType>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)
  const [history, setHistory] = useState<NetworkNodeType[][]>([])
  const [redoStack, setRedoStack] = useState<NetworkNodeType[][]>([])

  const [running, setRunning] = useState(false)
  const [nodeAddition, setAddition] = useState(false)
  const initializedNodes = useNodesInitialized()
  const [, toggleRunning, dragEvents] = useLayoutedElements()
  console.log("initialized", initializedNodes)

  const onNodeClick: NodeMouseHandler = (_, node) => {
    console.log("node clicked", node)

    // Center on clicked node
    setCenter(
      node.position.x + node.measured!.width! / 2,
      node.position.y + node.measured!.height! / 2,
      {
        zoom: 1,
        duration: 500,
      },
    )

    // Get immediate children of clicked node
    const existingNodeIds = new Set(nodes.map((n) => n.id))
    const newNodes = allNodes.filter(
      (n) =>
        (node as NetworkNodeType).connectsTo.includes(n.id) &&
        !existingNodeIds.has(n.id),
    )
    if (newNodes.length == 0) return

    // Temporarily disable running simulation
    const prevRunning = running
    if (prevRunning) {
      toggleRunning?.toggle()
      setRunning(false)
    }

    // Get new edges and add new nodes and edges to state. Save old nodes
    const oldNodes = nodes

    const newEdges = getEdgesFromNodes([...newNodes, node as NetworkNodeType])
    setNodes([node as NetworkNodeType, ...newNodes])
    setEdges([...newEdges])

    // Update history
    setHistory((prev) => [...prev, oldNodes])
    setRedoStack([])

    // Indicate a node addition action has occurred
    if (prevRunning) setAddition(true)
  }

  // Re-enable simulation once all nodes have been properly measured and initialized
  if (nodeAddition && initializedNodes && nodes.every((n) => n.measured)) {
    console.log("node addition check", nodes)
    toggleRunning?.toggle()
    setRunning(true)
    setAddition(false)
  }

  const nodeTypes = useMemo(
    () => ({
      network: (props: any) => <NetworkNode {...props} />,
    }),
    [],
  )

  // Back button
  const goBack = () => {
    if (history.length == 0) return

    const lastNodes = history[history.length - 1]

    // Temporarily disable running simulation
    const prevRunning = running
    if (prevRunning) {
      toggleRunning?.toggle()
      setRunning(false)
    }

    // Pop last snapshot from history
    setHistory((prev) => prev.slice(0, -1))

    // Add current snapshot to redo stack
    setRedoStack((prev) => [...prev, nodes])

    // Update current network
    const lastEdges = getEdgesFromNodes([...lastNodes])
    setNodes([...lastNodes])
    setEdges([...lastEdges])
  }

  // Next button
  const goNext = () => {
    if (redoStack.length == 0) return

    const nextNodes = redoStack[redoStack.length - 1]

    // Temporarily disable running simulation
    const prevRunning = running
    if (prevRunning) {
      toggleRunning?.toggle()
      setRunning(false)
    }

    // Pop next snapshot from redo stack
    setRedoStack((prev) => prev.slice(0, -1))

    // Add next snapshot to history
    setHistory((prev) => [...prev, nodes])

    // Update current network
    const nextEdges = getEdgesFromNodes([...nextNodes])
    setNodes([...nextNodes])
    setEdges([...nextEdges])
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeDragStart={dragEvents.start}
      onNodeDrag={dragEvents.drag}
      onNodeDragStop={dragEvents.stop}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      fitView
    >
      <Panel>
        {initializedNodes && toggleRunning && (
          <button
            onClick={() => {
              setRunning(!running)
              toggleRunning.toggle()
            }}
          >
            {running ? "Stop" : "Start"} force simulation
          </button>
        )}
      </Panel>
      <Panel position="bottom-left">
        <NavButton
          label="Back"
          onClick={goBack}
          icon={<ArrowLeft />}
          iconPlacement="left"
        />
      </Panel>
      <Panel position="bottom-right">
        <NavButton
          label="Next"
          onClick={goNext}
          icon={<ArrowRight />}
          iconPlacement="right"
        />
      </Panel>
      <Background color="#808080" variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
export default Network
