import { Edge, Node, OnNodeDrag } from "@xyflow/react"
import { SimulationNodeDatum } from "d3-force"

type NetworkNodeData = {
  label: string
  category: NodeCategory
}

export type NetworkNodeType = Node<NetworkNodeData, "network"> & {
  connectsTo: string[]
  fx?: number
  fy?: number
  x?: number
  y?: number
}

export interface D3Node extends SimulationNodeDatum {
  id: string
  position: { x: number; y: number }
  x: number
  y: number
  fx?: number
  fy?: number
}

export interface DragEvents {
  start: OnNodeDrag<NetworkNodeType>
  drag: OnNodeDrag<NetworkNodeType>
  stop: OnNodeDrag<NetworkNodeType>
}

export type UseLayoutedElementsReturn = [
  boolean, // initialized
  {
    toggle: () => void
    isRunning: () => boolean
  } | null,
  DragEvents // dragEvents object
]

export enum NodeCategory {
  initial = "init",
  relief = "relief",
  support = "support",
  pharma = "pharm",
  alternative = "alt",
  hrt = "hrt",
}

export interface HandleObject {
  id: string
  position: { x: number; y: number }
}
