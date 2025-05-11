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
  Panel,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

import { allNodes } from "@/data/nodes"
import { NetworkNodeType, NodeCategory } from "@/types"
import { useEffect, useMemo, useState } from "react"
import NetworkNode from "./NetworkNode"
import NavButton from "./NavButton"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLayoutedElements } from "@/hooks"

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

const initialNodes: NetworkNodeType[] = allNodes.filter(
  (node) => node.data.category == NodeCategory.initial,
)

const initialEdges: Edge[] = getEdgesFromNodes(initialNodes)

function Network() {
  const { setCenter, fitView } = useReactFlow<NetworkNodeType, Edge>()

  const [nodes, setNodes, onNodesChange] =
    useNodesState<NetworkNodeType>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)
  const [history, setHistory] = useState<NetworkNodeType[][]>([])
  const [redoStack, setRedoStack] = useState<NetworkNodeType[][]>([])

  const { dragEvents, start, stop, running } = useLayoutedElements()

  const onNodeClick: NodeMouseHandler = (_, node) => {
    console.log("node clicked", node)

    // Get immediate children of clicked node
    const existingNodeIds = new Set(nodes.map((n) => n.id))
    const newNodes = allNodes.filter(
      (n) =>
        (node as NetworkNodeType).connectsTo.includes(n.id) &&
        !existingNodeIds.has(n.id),
    )
    if (newNodes.length == 0) return

    // Get new edges and add new nodes and edges to state. Save old nodes
    const oldNodes = nodes

    setNodes([node as NetworkNodeType, ...newNodes])

    // Update history
    setHistory((prev) => [...prev, oldNodes])
    setRedoStack([])
  }

  // Back button
  const goBack = () => {
    if (history.length == 0) return

    const lastNodes = history[history.length - 1]

    // Pop last snapshot from history
    setHistory((prev) => prev.slice(0, -1))

    // Add current snapshot to redo stack
    setRedoStack((prev) => [...prev, nodes])

    // Update current network
    setNodes([...lastNodes])
  }

  // Next button
  const goNext = () => {
    if (redoStack.length == 0) return

    const nextNodes = redoStack[redoStack.length - 1]

    // Pop next snapshot from redo stack
    setRedoStack((prev) => prev.slice(0, -1))

    // Add next snapshot to history
    setHistory((prev) => [...prev, nodes])

    // Update current network
    setNodes([...nextNodes])
  }

  useEffect(() => {
    setEdges(getEdgesFromNodes(nodes))
  }, [nodes, setEdges])

  useEffect(() => {
    if (nodes.length > 0) {
      fitView({ duration: 300, padding: 0.1 })
    }
  }, [nodes, fitView])

  const nodeTypes = useMemo(
    () => ({
      network: (props: any) => <NetworkNode {...props} />,
    }),
    [],
  )

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
      <Panel position="top-left">
        <button onClick={() => (running ? stop() : start())}>
          {running ? "Stop Simulation" : "Start Simulation"}
        </button>
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
