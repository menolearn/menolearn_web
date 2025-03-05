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
import { useCallback, useMemo, useRef, useState } from "react"
import NetworkNode from "./NetworkNode"
import collide from "./collide"

const getEdgesFromNodes = (nodes: NetworkNodeType[]): Edge[] => {
  return nodes.flatMap((node) => {
    return node.connectsTo
      .map((targetId) => {
        const targetNode = nodes.find((n) => n.id == targetId)
        if (!targetNode) return null

        const { closestSourceHandle, closestTargetHandle } = getClosestHandles(
          node,
          targetNode
        )

        if (closestSourceHandle && closestTargetHandle) {
          return {
            id: `e${node.id}-${targetId}`,
            source: node.id,
            target: targetId,
            sourceHandle: closestSourceHandle.id,
            targetHandle: closestTargetHandle.id,
          }
        }

        return null
      })
      .filter(Boolean) as Edge[]
  })
}

const getClosestHandles = (
  sourceNode: NetworkNodeType,
  targetNode: NetworkNodeType
): {
  closestSourceHandle: HandleObject | null
  closestTargetHandle: HandleObject | null
} => {
  const sourceHandles: HandleObject[] = [
    {
      id: `t-${sourceNode.id}`,
      position: { x: sourceNode.position.x, y: sourceNode.position.y },
    },
    // {
    //   id: `l-${sourceNode.id}`,
    //   position: { x: sourceNode.position.x - 100, y: sourceNode.position.y },
    // },
    {
      id: `b-${sourceNode.id}`,
      position: { x: sourceNode.position.x, y: sourceNode.position.y + 50 },
    },
    // {
    //   id: `r-${sourceNode.id}`,
    //   position: { x: sourceNode.position.x + 100, y: sourceNode.position.y },
    // },
  ]

  const targetHandles: HandleObject[] = [
    {
      id: `t-${targetNode.id}`,
      position: { x: targetNode.position.x, y: targetNode.position.y },
    },
    // {
    //   id: `l-${targetNode.id}`,
    //   position: { x: targetNode.position.x - 100, y: targetNode.position.y },
    // },
    {
      id: `b-${targetNode.id}`,
      position: { x: targetNode.position.x, y: targetNode.position.y + 50 },
    },
    // {
    //   id: `r-${targetNode.id}`,
    //   position: { x: targetNode.position.x + 100, y: targetNode.position.y },
    // },
  ]

  let closestDistance = Infinity
  let closestSourceHandle: HandleObject | null = null
  let closestTargetHandle: HandleObject | null = null

  // Loop through source and target handles to find the closest pair
  sourceHandles.forEach((sourceHandle) => {
    targetHandles.forEach((targetHandle) => {
      const distance = Math.sqrt(
        Math.pow(sourceHandle.position.x - targetHandle.position.x, 2) +
          Math.pow(sourceHandle.position.y - targetHandle.position.y, 2)
      )

      if (distance < closestDistance) {
        closestDistance = distance
        closestSourceHandle = sourceHandle
        closestTargetHandle = targetHandle
      }
    })
  })

  return { closestSourceHandle, closestTargetHandle }
}

const simulation = forceSimulation()
  .force("charge", forceManyBody().strength(-1500))
  .force("x", forceX().x(0).strength(0.05))
  .force("y", forceY().y(0).strength(0.05))
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
    []
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
        .strength(0.05)
        .distance(100)
    )

    console.log("memo nodes", nodes)
    // The tick function is called every animation frame while the simulation is
    // running and progresses the simulation one step forward each time.
    const tick = () => {
      const tickNodes = getNodes() as NetworkNodeType[]

      console.log("original nodes", nodes)
      console.log("tick nodes", tickNodes)

      if (tickNodes.length != nodes.length) {
        console.log("here")
        window.requestAnimationFrame(() => {
          if (running) tick()
        })
        return
      }

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
        })
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
  }, [initialized, dragEvents, getNodes, getEdges, setNodes, fitView, running])
}

const initialNodes: NetworkNodeType[] = allNodes.filter(
  (node) => node.data.category == NodeCategory.initial
)

const initialEdges: Edge[] = getEdgesFromNodes(initialNodes)

const nodeTypes = { network: NetworkNode }

function Network() {
  const { setCenter } = useReactFlow<NetworkNodeType, Edge>()
  const [nodes, setNodes, onNodesChange] =
    useNodesState<NetworkNodeType>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)
  const [running, setRunning] = useState(false)
  const [nodeAddition, setAddition] = useState(false)
  const initializedNodes = useNodesInitialized()
  const [initialized, toggleRunning, dragEvents] = useLayoutedElements()

  const onNodeClick: NodeMouseHandler = (_, node) => {
    console.log("node clicked", node)

    setCenter(
      node.position.x + node.measured!.width! / 2,
      node.position.y + node.measured!.height! / 2,
      {
        zoom: 1,
        duration: 500,
      }
    )

    const existingNodeIds = new Set(nodes.map((n) => n.id))

    const newNodes = allNodes.filter(
      (n) =>
        (node as NetworkNodeType).connectsTo.includes(n.id) &&
        !existingNodeIds.has(n.id) // TODO: Add extra logic for nodes that already exist
    )

    if (newNodes.length == 0) return
    const prevRunning = running
    if (prevRunning) {
      toggleRunning?.toggle()
      setRunning(false)
    }

    const newEdges = getEdgesFromNodes([...newNodes, node as NetworkNodeType])

    setNodes((nds) => [...nds, ...newNodes])

    setEdges([...edges, ...newEdges])
    console.log("inside onNodeClick", nodes, initializedNodes)
    if (prevRunning) setAddition(true)
  }

  if (nodeAddition && initializedNodes && nodes[nodes.length - 1].measured) {
    console.log("node addition check", nodes, initializedNodes)
    toggleRunning?.toggle()
    setRunning(true)
    setAddition(false)
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
        {initialized && toggleRunning && (
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
      <Background color="#808080" variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
export default Network
