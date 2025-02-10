export const initialNodes = [
  {
    id: "1",
    type: "source",
    data: { label: "What is menopause?", numHandles: 5 },
    position: { x: 400, y: 300 },    style: { backgroundColor: '#80ebf1', color: 'black' },
  },
  {
    id: "1a",
    data: { label: "Need Relief?" },
    position: { x: 0, y: 300 },
    style: { backgroundColor: '#8b9df5', color: 'black' },
  },
  {
    id: "1b",
    data: { label: "Need Support?" },
    position: { x: 400, y: 500 },
    style: { backgroundColor: '#8b9df5', color: 'black' },
  },
  {
    id: "1c",
    data: { label: "Got Questions?" },
    position: { x: 700, y: 300 },
    style: { backgroundColor: '#8b9df5', color: 'black' },
  },
  {
    id: "1d",
    data: { label: "Take A Quiz" },
    position: { x: 400, y: 100 },
    style: { backgroundColor: '#8b9df5', color: 'black' },
  },
]

export const initialEdges = [
  { id: "e11a", source: "1", target: "1a", sourceHandle: 'l1', style: { strokeWidth: 3 }, animated: false },
  { id: "e11b", source: "1", target: "1b", sourceHandle: 'b1',style: { strokeWidth: 3 }, animated: false },
  { id: "e11c", source: "1", target: "1c", sourceHandle: 'r1', style: { strokeWidth: 3 }, animated: false },
  { id: "e11d", source: "1", target: "1d", sourceHandle: 't1', style: { strokeWidth: 3 }, animated: false },
]

//==============================================================================================================================================

export const reliefNodes = [
  {
    id: "2",
    type: "source",
    data: { label: "Relief", numHandles: 2 },
    position: { x: 400, y: 300 },
    style: { backgroundColor: '#8b9df5', color: 'black' },
  },
  {
    id: "2a",
    data: { label: "Pharmacological" },
    position: { x: 0, y: 300 },
    style: { backgroundColor: '#80ebf1', color: 'black' },
  },
  {
    id: "2b",
    data: { label: "Alternative" },
    position: { x: 400, y: 500 },
    style: { backgroundColor: '#80ebf1', color: 'black' },
  },
]

export const reliefEdges = [
  { id: "e22a", source: "2", target: "2a", sourceHandle: 'l1', style: { strokeWidth: 3 }, animated: false },
  { id: "e22b", source: "2", target: "2b", sourceHandle: 'b1', style: { strokeWidth: 3 }, animated: false },
]

//==============================================================================================================================================

export const supportNodes = [
  {
    id: "2",
    type: "source",
    data: { label: "Relief" },
    position: { x: 400, y: 300 },
    style: { backgroundColor: '#8b9df5', color: 'black' },
  },
  {
    id: "2a",
    data: { label: "Pharmacological" },
    position: { x: 0, y: 300 },
    style: { backgroundColor: '#80ebf1', color: 'black' },
  },
  {
    id: "2b",
    data: { label: "Alternative" },
    position: { x: 400, y: 500 },
    style: { backgroundColor: '#80ebf1', color: 'black' },
  },
]

export const supportEdges = [
  { id: "e22a", source: "2", target: "2a", sourceHandle: 'l', style: { strokeWidth: 3 }, animated: false },
  { id: "e22b", source: "2", target: "2b", sourceHandle: 'r',style: { strokeWidth: 3 }, animated: false },
]
