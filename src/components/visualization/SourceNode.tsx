import { useCallback, useEffect } from "react"
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react"
import { NodeProps, Node } from "@xyflow/react"
import { SourceNodeData } from "./nodes-edges"

const handleStyle = { left: 10 }

function SourceNode({
  id,
  data,
  isConnectable,
}: NodeProps<Node<SourceNodeData>>) {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value)
  // }, [])

  const numHandles = data.numHandles
  const updateNodeInternals = useUpdateNodeInternals()

  useEffect(() => {
    updateNodeInternals(id)
  }, [id, updateNodeInternals])

  const handles = []

  let numLeft = 0
  let numRight = 0
  let numTop = 0
  let numBottom = 0

  for (let i = 0; i < numHandles; i++) {
    const loc = i % 4
    switch (loc) {
      case 1:
        numLeft++
        handles.push(
          <Handle
            type="source"
            position={Position.Left}
            id={`l${numLeft}`}
            key={i}
            isConnectable={isConnectable}
          />
        )
        continue
      case 2:
        numRight++
        handles.push(
          <Handle
            type="source"
            position={Position.Right}
            id={`r${numRight}`}
            key={i}
            isConnectable={isConnectable}
          />
        )
        continue
      case 3:
        numTop++
        handles.push(
          <Handle
            type="source"
            position={Position.Top}
            id={`t${numTop}`}
            key={i}
            isConnectable={isConnectable}
          />
        )
        continue
      default:
        numBottom++
        handles.push(
          <Handle
            type="source"
            position={Position.Bottom}
            id={`b${numBottom}`}
            key={i}
            isConnectable={isConnectable}
          />
        )
    }
  }

  return (
    <div>
      <div>
        <strong>{data.label as string}</strong>
      </div>
      {handles}
    </div>
  )
}

export default SourceNode
