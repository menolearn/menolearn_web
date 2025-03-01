import { useCallback } from "react"
import { Handle, NodeProps, Position } from "@xyflow/react"
import { NetworkNodeType } from "@/data/nodes"

export default function NetworkNode({ data }: NodeProps<NetworkNodeType>) {
  return (
    <>
      <div className="border-2 border-black w-60 py-3 text-center rounded-md">
        <p className="font-semibold">{data.label}</p>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  )
}
