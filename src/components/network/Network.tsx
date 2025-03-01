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
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { allNodes } from "@/data/nodes"
import { HandleObject, NetworkNodeType, NodeCategory } from "@/types"
import { useCallback, useState } from "react"
import NetworkNode from "./NetworkNode"

const getEdgesFromNodes = (nodes: NetworkNodeType[]): Edge[] => {
  return nodes.flatMap((node) => {
    // Find the closest handles for each connection
    return node.connectsTo
      .map((targetId) => {
        const targetNode = nodes.find((n) => n.id === targetId)
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
    {
      id: `l-${sourceNode.id}`,
      position: { x: sourceNode.position.x - 100, y: sourceNode.position.y },
    },
    {
      id: `b-${sourceNode.id}`,
      position: { x: sourceNode.position.x, y: sourceNode.position.y + 50 },
    },
    {
      id: `r-${sourceNode.id}`,
      position: { x: sourceNode.position.x + 100, y: sourceNode.position.y },
    },
  ]

  const targetHandles: HandleObject[] = [
    {
      id: `t-${targetNode.id}`,
      position: { x: targetNode.position.x, y: targetNode.position.y },
    },
    {
      id: `l-${targetNode.id}`,
      position: { x: targetNode.position.x - 100, y: targetNode.position.y },
    },
    {
      id: `b-${targetNode.id}`,
      position: { x: targetNode.position.x, y: targetNode.position.y + 50 },
    },
    {
      id: `r-${targetNode.id}`,
      position: { x: targetNode.position.x + 100, y: targetNode.position.y },
    },
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

const initialNodes: NetworkNodeType[] = allNodes.filter(
  (node) => node.data.category == NodeCategory.initial
)
const initialEdges: Edge[] = getEdgesFromNodes(initialNodes)

const nodeTypes = { network: NetworkNode }

function Network() {
  const { setCenter } = useReactFlow()
  const [nodes, setNodes, onNodesChange] =
    useNodesState<NetworkNodeType>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges)

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      console.log("node clicked")

      setCenter(node.position.x, node.position.y, { zoom: 1, duration: 500 })

      const existingNodeIds = new Set(nodes.map((n) => n.id))

      const newNodes = allNodes.filter(
        (n) =>
          (node as NetworkNodeType).connectsTo.includes(n.id) &&
          !existingNodeIds.has(n.id)
      )

      if (newNodes.length == 0) return

      setNodes((nds) => [...nds, ...newNodes])
      setEdges((eds) => [
        ...eds,
        ...getEdgesFromNodes([...newNodes, node as NetworkNodeType]),
      ])
    },
    [nodes, setNodes, setEdges]
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      fitView
    >
      <Background color="#808080" variant={BackgroundVariant.Dots} />
    </ReactFlow>
  )
}
export default Network
