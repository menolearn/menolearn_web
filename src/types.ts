import { Node } from "@xyflow/react"

export type NetworkNodeType = Node & {
  data: { label: string; category: NodeCategory }
  connectsTo: string[]
}

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
