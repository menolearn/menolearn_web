import { Handle, NodeProps, Position } from "@xyflow/react"
import { NetworkNodeType } from "@/types"
import { Info } from "lucide-react"
import Link from "next/link"

export default function NetworkNode({ id, data }: NodeProps<NetworkNodeType>) {
  const Icon = data.icon
  return (
    <>
      <div className="border-node-border bg-node-bg grid max-w-xs justify-items-start rounded-3xl border-4 px-6 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          {" "}
          {Icon && <Icon className="h-6 w-6 text-black" />}
          <p className="font-semibold">{data.label}</p>
          {data.description ? (
            <Link
              href={`/info/${id}`}
              scroll={false}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Info height={26} width={26} />
            </Link>
          ) : null}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id={`t-${id}`}
        isConnectable={false}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id={`b-${id}`}
        isConnectable={false}
      />
    </>
  )
}
