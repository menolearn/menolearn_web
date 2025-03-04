import { NetworkNodeType, NodeCategory } from "@/types"

export const allNodes: NetworkNodeType[] = [
  {
    id: "1",
    type: "network",
    data: { label: "What Is Menopause?", category: NodeCategory.initial },
    position: { x: 400, y: 300 },
    connectsTo: ["1a", "1b", "1c", "1d"],
  },
  {
    id: "1a",
    type: "network",
    data: { label: "Need Relief?", category: NodeCategory.initial },
    position: { x: 100, y: 300 },
    connectsTo: ["2a", "2b"],
  },
  {
    id: "1b",
    type: "network",
    data: { label: "Need Support?", category: NodeCategory.initial },
    position: { x: 400, y: 500 },
    connectsTo: ["5a", "5b", "5c", "5d"],
  },
  {
    id: "1c",
    type: "network",
    data: { label: "Got Questions?", category: NodeCategory.initial },
    position: { x: 700, y: 300 },
    connectsTo: [],
  },
  {
    id: "1d",
    type: "network",
    data: { label: "Take A Quiz", category: NodeCategory.initial },
    position: { x: 400, y: 100 },
    connectsTo: [],
  },
  // Relief nodes
  {
    id: "2a",
    type: "network",
    data: { label: "Pharmacological", category: NodeCategory.relief },
    position: { x: -300, y: 300 },
    connectsTo: ["3a", "3b", "3c"],
  },
  {
    id: "2b",
    type: "network",
    data: { label: "Alternative", category: NodeCategory.relief },
    position: { x: 100, y: 500 },
    connectsTo: ["6a", "6b", "6c", "6d"],
  },
  // Pharmacological nodes
  {
    id: "3a",
    type: "network",
    data: {
      label: "HRT/MHT",
      category: NodeCategory.pharma,
    },
    position: { x: -300, y: 100 },
    connectsTo: ["4a", "4b", "4c"],
  },
  {
    id: "3b",
    type: "network",
    data: {
      label: "Other Novel Hormonal",
      category: NodeCategory.pharma,
    },
    position: { x: -300, y: 500 },
    connectsTo: [],
  },
  {
    id: "3c",
    type: "network",
    data: { label: "Non-Hormonal", category: NodeCategory.pharma },
    position: { x: -700, y: 300 },
    connectsTo: [],
  },
  // HRT/MHT
  {
    id: "4a",
    type: "network",
    data: { label: "EPT", category: NodeCategory.hrt },
    position: { x: -300, y: 0 },
    connectsTo: [],
  },
  {
    id: "4b",
    type: "network",
    data: { label: "ET", category: NodeCategory.hrt },
    position: { x: -700, y: 100 },
    connectsTo: [],
  },
  {
    id: "4c",
    type: "network",
    data: { label: "Progesterone", category: NodeCategory.hrt },
    position: { x: 0, y: 100 },
    connectsTo: [],
  },
  // Support nodes
  {
    id: "5a",
    type: "network",
    data: { label: "Mental Health Symptoms", category: NodeCategory.support },
    position: { x: 300, y: 500 },
    connectsTo: [],
  },
  {
    id: "5b",
    type: "network",
    data: { label: "Vasomotor Symptoms", category: NodeCategory.support },
    position: { x: 700, y: 300 },
    connectsTo: [],
  },
  {
    id: "5c",
    type: "network",
    data: { label: "Genitourinary Symptoms", category: NodeCategory.support },
    position: { x: 400, y: 100 },
    connectsTo: [],
  },
  // Alt treatments
  {
    id: "6a",
    type: "network",
    data: { label: "Other Symptoms", category: NodeCategory.alternative },
    position: { x: 500, y: 500 },
    connectsTo: [],
  },
  {
    id: "6b",
    type: "network",
    data: { label: "Therapy", category: NodeCategory.alternative },
    position: { x: 100, y: 300 },
    connectsTo: [],
  },
  {
    id: "6c",
    type: "network",
    data: { label: "Lifestyle", category: NodeCategory.alternative },
    position: { x: 500, y: 500 },
    connectsTo: [],
  },
  {
    id: "6d",
    type: "network",
    data: { label: "Supplemental", category: NodeCategory.alternative },
    position: { x: 700, y: 300 },
    connectsTo: [],
  },
]
