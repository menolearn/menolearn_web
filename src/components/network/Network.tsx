"use client"
import {
  Edge,
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  NodeChange,
  useNodesState,
  useEdgesState,
  NodeMouseHandler,
  ReactFlowProvider,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { allNodes, NetworkNodeType, NodeCategory } from "@/data/nodes"
import { useCallback, useState } from "react"
import NetworkNode from "./NetworkNode"

const getEdgesFromNodes = (nodes: NetworkNodeType[]): Edge[] =>
  nodes.flatMap((node) =>
    node.connectsTo.map((targetId) => ({
      id: `e${node.id}-${targetId}`,
      source: node.id,
      target: targetId,
    }))
  )

const initialNodes: NetworkNodeType[] = allNodes.filter(
  (node) => node.data.category == NodeCategory.initial
)
const initialEdges: Edge[] = getEdgesFromNodes(initialNodes)

const nodeTypes = { network: NetworkNode }

function Network() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<NetworkNodeType>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      console.log("node clicked")
      const existingNodeIds = new Set(nodes.map((n) => n.id))

      const newNodes = allNodes.filter(
        (n) =>
          (node as NetworkNodeType).connectsTo.includes(n.id) &&
          !existingNodeIds.has(n.id)
      )

      if (newNodes.length == 0) return

      setNodes((nds) => [...nds, ...newNodes])
      setEdges((eds) => [...eds, ...getEdgesFromNodes(newNodes)])
    },
    [nodes, setNodes, setEdges]
  )

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      />
    </ReactFlowProvider>
  )
}
export default Network
