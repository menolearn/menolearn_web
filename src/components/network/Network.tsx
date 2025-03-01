"use client"
import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
  NodeChange,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import {
  initialNodes,
  initialEdges,
  reliefNodes,
  reliefEdges,
  supportNodes,
  supportEdges,
  pharmNodes,
  pharmEdges,
  altNodes,
  altEdges,
} from "../../data/nodes-edges"
import { useCallback, useState } from "react"
import SourceNode from "../visualization/SourceNode"

const nodeTypes = { source: SourceNode }

function Network() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes: NodeChange<any>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange = useCallback(
    (
      changes: EdgeChange<{
        id: string
        source: string
        target: string
        sourceHandle: string
        style: {
          strokeWidth: number
        }
        animated: boolean
      }>[]
    ) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Network
