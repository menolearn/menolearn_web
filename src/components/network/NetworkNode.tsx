import { useCallback } from "react"
import { Handle, NodeProps, Position } from "@xyflow/react"
import { NetworkNodeType } from "@/types"

export default function NetworkNode({ id, data }: NodeProps<NetworkNodeType>) {
  return (
    <>
      <div className="border-2 border-black w-60 py-3 text-center rounded-md">
        <p className="font-semibold">{data.label}</p>
      </div>
      <Handle type="target" position={Position.Top} id={`t-${id}`} />
      <Handle type="source" position={Position.Top} id={`t-${id}`} />
      <Handle type="target" position={Position.Left} id={`l-${id}`} />
      <Handle type="source" position={Position.Left} id={`l-${id}`} />
      <Handle type="source" position={Position.Bottom} id={`b-${id}`} />
      <Handle type="target" position={Position.Bottom} id={`b-${id}`} />
      <Handle type="source" position={Position.Right} id={`r-${id}`} />
      <Handle type="target" position={Position.Right} id={`r-${id}`} />
    </>
  )
}
