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
    connectsTo: [],
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
    position: { x: 0, y: 300 },
    connectsTo: ["3a", "3b", "3c"],
  },
  {
    id: "2b",
    type: "network",
    data: { label: "Alternative", category: NodeCategory.relief },
    position: { x: 400, y: 500 },
    connectsTo: [],
  },
  // Pharmacological nodes
  {
    id: "3a",
    type: "network",
    data: {
      label: "HRT/MHT",
      category: NodeCategory.pharma,
    },
    position: { x: 0, y: 300 },
    connectsTo: ["4a", "4b", "4c"],
  },
  {
    id: "3b",
    type: "network",
    data: {
      label: "Other Novel Hormonal",
      category: NodeCategory.pharma,
    },
    position: { x: 400, y: 500 },
    connectsTo: [],
  },
  {
    id: "3c",
    type: "network",
    data: { label: "Non-Hormonal", category: NodeCategory.pharma },
    position: { x: 700, y: 300 },
    connectsTo: [],
  },
  // HRT/MHT
  {
    id: "4a",
    type: "network",
    data: { label: "EPT", category: NodeCategory.hrt },
    position: { x: 0, y: 300 },
    connectsTo: [],
  },
  {
    id: "4b",
    type: "network",
    data: { label: "ET", category: NodeCategory.hrt },
    position: { x: 400, y: 500 },
    connectsTo: [],
  },
  {
    id: "4c",
    type: "network",
    data: { label: "Progesterone", category: NodeCategory.hrt },
    position: { x: 700, y: 300 },
    connectsTo: [],
  },
]

const supportNodes = [
  {
    id: "3",
    type: "source",
    data: { label: "Support For:", numHandles: 5 },
    position: { x: 400, y: 300 },
    style: { backgroundColor: "#8b9df5", color: "black" },
  },
  {
    id: "3a",
    data: { label: "Take Quiz" },
    position: { x: 0, y: 300 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "3b",
    data: { label: "Mental Health Symptoms" },
    position: { x: 300, y: 500 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "3c",
    data: { label: "Vasomotor Symptoms" },
    position: { x: 700, y: 300 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "3d",
    data: { label: "Genitourinary Symptoms" },
    position: { x: 400, y: 100 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "3e",
    data: { label: "Other Symptoms" },
    position: { x: 500, y: 500 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
]

const supportEdges = [
  {
    id: "e33a",
    source: "3",
    target: "3a",
    sourceHandle: "l1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e33b",
    source: "3",
    target: "3b",
    sourceHandle: "b1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e33c",
    source: "3",
    target: "3c",
    sourceHandle: "r1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e33d",
    source: "3",
    target: "3d",
    sourceHandle: "t1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e33e",
    source: "3",
    target: "3e",
    sourceHandle: "b2",
    style: { strokeWidth: 3 },
    animated: false,
  },
]

//==============================================================================================================================================

export const altNodes = [
  {
    id: "5",
    type: "source",
    data: { label: "Alternative Treatments", numHandles: 3 },
    position: { x: 400, y: 300 },
    style: { backgroundColor: "#8b9df5", color: "black" },
  },
  {
    id: "5a",
    data: { label: "Therapy" },
    position: { x: 100, y: 300 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "5b",
    data: { label: "Lifestyle" },
    position: { x: 500, y: 500 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "5c",
    data: { label: "Supplemental" },
    position: { x: 700, y: 300 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
]

export const altEdges = [
  {
    id: "e55a",
    source: "5",
    target: "5a",
    sourceHandle: "l1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e55b",
    source: "5",
    target: "5b",
    sourceHandle: "b1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e55c",
    source: "5",
    target: "5c",
    sourceHandle: "r1",
    style: { strokeWidth: 3 },
    animated: false,
  },
]
