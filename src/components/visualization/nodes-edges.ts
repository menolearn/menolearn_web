export interface SourceNodeData extends Record<string, string | number> {
  label: string
  numHandles: number
}

export const initialNodes = [
  {
    id: "1",
    type: "source",
    data: { label: "What Is Menopause?", numHandles: 5 },
    position: { x: 400, y: 300 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "1a",
    data: { label: "Need Relief?" },
    position: { x: 0, y: 300 },
    style: { backgroundColor: "#8b9df5", color: "black" },
  },
  {
    id: "1b",
    data: { label: "Need Support?" },
    position: { x: 400, y: 500 },
    style: { backgroundColor: "#8b9df5", color: "black" },
  },
  {
    id: "1c",
    data: { label: "Got Questions?" },
    position: { x: 700, y: 300 },
    style: { backgroundColor: "#8b9df5", color: "black" },
  },
  {
    id: "1d",
    data: { label: "Take A Quiz" },
    position: { x: 400, y: 100 },
    style: { backgroundColor: "#8b9df5", color: "black" },
  },
]

export const initialEdges = [
  {
    id: "e11a",
    source: "1",
    target: "1a",
    sourceHandle: "l1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e11b",
    source: "1",
    target: "1b",
    sourceHandle: "b1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e11c",
    source: "1",
    target: "1c",
    sourceHandle: "r1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e11d",
    source: "1",
    target: "1d",
    sourceHandle: "t1",
    style: { strokeWidth: 3 },
    animated: false,
  },
]

//==============================================================================================================================================

export const reliefNodes = [
  {
    id: "2",
    type: "source",
    data: { label: "Relief", numHandles: 2 },
    position: { x: 400, y: 300 },
    style: { backgroundColor: "#8b9df5", color: "black" },
  },
  {
    id: "2a",
    data: { label: "Pharmacological" },
    position: { x: 0, y: 300 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "2b",
    data: { label: "Alternative" },
    position: { x: 400, y: 500 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
]

export const reliefEdges = [
  {
    id: "e22a",
    source: "2",
    target: "2a",
    sourceHandle: "l1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e22b",
    source: "2",
    target: "2b",
    sourceHandle: "b1",
    style: { strokeWidth: 3 },
    animated: false,
  },
]

//==============================================================================================================================================

export const supportNodes = [
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

export const supportEdges = [
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

export const pharmNodes = [
  {
    id: "4",
    type: "source",
    data: { label: "Pharmacological Treatments", numHandles: 5 },
    position: { x: 400, y: 300 },
    style: { backgroundColor: "#8b9df5", color: "black" },
  },
  {
    id: "4a",
    data: { label: "Unsure which would be best for you? Take Our Quiz!" },
    position: { x: 0, y: 300 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "4b",
    data: { label: "HRT/MHT" },
    position: { x: 400, y: 500 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "4c",
    data: { label: "Other Novel Hormonal" },
    position: { x: 700, y: 300 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
  {
    id: "4d",
    data: { label: "Non-Hormonal" },
    position: { x: 400, y: 100 },
    style: { backgroundColor: "#80ebf1", color: "black" },
  },
]

export const pharmEdges = [
  {
    id: "e44a",
    source: "4",
    target: "4a",
    sourceHandle: "l1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e44b",
    source: "4",
    target: "4b",
    sourceHandle: "b1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e44c",
    source: "4",
    target: "4c",
    sourceHandle: "r1",
    style: { strokeWidth: 3 },
    animated: false,
  },
  {
    id: "e44d",
    source: "4",
    target: "4d",
    sourceHandle: "t1",
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
