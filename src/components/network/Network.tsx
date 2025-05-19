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
import { useEffect, useState } from "react"
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

const estimateChildrenX = (newNodes: NetworkNodeType[], gap: number) => {
  const totalSpacing = (newNodes.length - 1) * gap
  const estimatedWidths = newNodes.map((n) => {
    const est = n.data.label.length * 16
    if (est > 320) {
      return 320 + 48
    } else {
      return est + 48
    }
  }) // Estimate width by characters and padding
  const totalChildrenWidth = estimatedWidths.reduce(
    (acc, curr) => acc + curr,
    0,
  )
  return [totalChildrenWidth + totalSpacing, estimatedWidths] as const
}

const initialNodes: NetworkNodeType[] = allNodes.filter(
  (node) => node.data.category == NodeCategory.initial,
)
const initialRoot = initialNodes.find((x) => x.id == "1")!
const initChildren = initialNodes.filter((x) => x.id != "1")

const newY = 150 // Make children below parent
const childrenGap = 30

const estimateX = estimateChildrenX(initChildren, childrenGap)
const totalRowWidth = estimateX[0]
let newX = (250 - totalRowWidth) / 2

for (let i = 0; i < initChildren.length; i++) {
  const newNode = initChildren[i]
  newNode.position.y = newY
  newNode.position.x = newX

  newX += estimateX[1][i] + childrenGap
}

const initialEdges: Edge[] = getEdgesFromNodes(initialNodes)

const nodeTypes = {
  network: NetworkNode,
}

function Network({ chatOpen }: { chatOpen: boolean }) {
  const { fitView } = useReactFlow<NetworkNodeType, Edge>()
  const [nodes, setNodes, onNodesChange] =
    useNodesState<NetworkNodeType>(initialNodes)
  const [rootNode, setRootNode] = useState<NetworkNodeType>(initialRoot)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)
  const [history, setHistory] = useState<NetworkNodeType[][]>([])
  const [redoStack, setRedoStack] = useState<NetworkNodeType[][]>([])

  const { dragEvents, start, stop, running } = useLayoutedElements()

  const onNodeClick: NodeMouseHandler = (_, node) => {
    // Get immediate children of clicked node
    const existingNodeIds = new Set(nodes.map((n) => n.id))
    const newNodes = allNodes.filter(
      (n) =>
        (node as NetworkNodeType).connectsTo.includes(n.id) &&
        !existingNodeIds.has(n.id),
    )
    if (newNodes.length == 0) return

    const newY = rootNode.position.y + 150 // Make children below parent
    const childrenGap = 30

    const estimateX = estimateChildrenX(newNodes, childrenGap)
    const totalRowWidth = estimateX[0]
    let newX = rootNode.position.x + (node.measured!.width! - totalRowWidth) / 2

    for (let i = 0; i < newNodes.length; i++) {
      const newNode = newNodes[i]
      newNode.position.y = newY
      newNode.position.x = newX

      newX += estimateX[1][i] + childrenGap
    }

    // Get new edges and add new nodes and edges to state. Save old nodes
    const oldNodes = nodes

    setNodes([
      { ...node, position: rootNode.position } as NetworkNodeType,
      ...newNodes,
    ])
    setEdges(getEdgesFromNodes([node as NetworkNodeType, ...newNodes]))

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
    setEdges(getEdgesFromNodes(lastNodes))
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
    setEdges(getEdgesFromNodes(nextNodes))
  }

  // Fit view to nodes when they change
  useEffect(() => {
    if (nodes.length > 0 && !running) {
      fitView({ duration: 200, padding: 0.1 })
    } else if (nodes.length > 0 && running) {
      fitView({ duration: 30, padding: 0.1 })
    }
  }, [nodes, fitView])

  // Stop simulation when chat is open
  useEffect(() => {
    if (running && chatOpen) {
      stop()
    }
  }, [chatOpen])

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
      {history.length > 0 && (
        <Panel position="bottom-left">
          <NavButton
            label="Back"
            onClick={goBack}
            icon={<ArrowLeft />}
            iconPlacement="left"
          />
        </Panel>
      )}
      {redoStack.length > 0 && (
        <Panel position="bottom-right">
          <NavButton
            label="Next"
            onClick={goNext}
            icon={<ArrowRight />}
            iconPlacement="right"
          />
        </Panel>
      )}
      <Background color="#808080" variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
export default Network
