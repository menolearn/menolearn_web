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
  otherNovelHormonal = "otherNovelHormonal",
  nonHormonal = "nonHormonal",
  therapy = "therapy",
  cbt = "cbt",
  lifestyle = "lifestyle",
  supplemental = "supplemental",
  mentalHealth = "mentalHealth",
  vasomotor = "vasomotor",
  genitourinary = "genitourinary",
}

type NetworkNodeData = {
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  label: string
  category: NodeCategory
  description?: Partial<NodeDescription>
}

interface NodeDescription {
  generic: string
  vasomotor: string
  genitourinary: string
  mentalHealth: string
}

export type NetworkNodeType = Node<NetworkNodeData, "network"> & {
  connectsTo: string[]
  fx?: number
  fy?: number
  x?: number
  y?: number
  vx?: number
  vy?: number
}

export interface DragEvents {
  start: OnNodeDrag<NetworkNodeType>
  drag: OnNodeDrag<NetworkNodeType>
  stop: OnNodeDrag<NetworkNodeType>
}
