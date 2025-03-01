import { useCallback } from "react"
import { Handle, Position } from "@xyflow/react"

const handleStyle = { left: 10 }

export default function NetworkNode({ data }: any) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value)
  }, [])

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <p>{data.label}</p>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  )
}
