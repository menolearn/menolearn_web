import { Handle, NodeProps, Position } from "@xyflow/react"
import { NetworkNodeType } from "@/types"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export default function NetworkNode({ id, data }: NodeProps<NetworkNodeType>) {
  // const [expanded, setExpanded] = useState(false)
  const Icon = data.icon
  return (
    <>
      <div className="grid max-w-xs justify-items-start rounded-3xl border-4 border-nodeBorder bg-nodeBg px-6 py-3 text-center">
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
                // setExpanded(!expanded)
              }}
              // className={`transition-all duration-500 ease-in-out ${
              //   expanded ? "rotate-180" : ""
              // }`}
            >
              <ChevronDown />
            </Link>
          ) : null}
        </div>

        {/* <div
          className={`text-left transition-all duration-500 ease-in-out ${
            expanded
              ? "mt-2 max-h-[500px] scale-100 opacity-100"
              : "max-h-0 scale-95 opacity-0"
          }`}
        >
          {expanded && <p>{data.description}</p>}
        </div> */}
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
