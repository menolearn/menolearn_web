import { Node, OnNodeDrag } from "@xyflow/react"
import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export enum NodeCategory {
  initial = "init",
  relief = "relief",
  support = "support",
  pharma = "pharm",
  alternative = "alt",
  hrt = "hrt",
}

type NetworkNodeData = {
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  label: string
  category: NodeCategory
  description?: string
}

export type NetworkNodeType = Node<NetworkNodeData, "network"> & {
  connectsTo: string[]
  fx?: number
  fy?: number
  x?: number
  y?: number
}

export interface DragEvents {
  start: OnNodeDrag<NetworkNodeType>
  drag: OnNodeDrag<NetworkNodeType>
  stop: OnNodeDrag<NetworkNodeType>
}
