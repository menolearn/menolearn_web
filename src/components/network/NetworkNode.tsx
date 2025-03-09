import { Handle, NodeProps, Position } from "@xyflow/react"
import { NetworkNodeType } from "@/types"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function NetworkNode({
  id,
  data,
  expandClick,
}: NodeProps<NetworkNodeType> & { expandClick: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <div className="border-2 border-black grid justify-items-start max-w-xs px-6 py-3 text-center rounded-xl bg-white">
        <div className="flex items-center gap-2 justify-center">
          {" "}
          <p className="font-semibold">{data.label}</p>
          {data.description ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setExpanded(!expanded)
                expandClick(id)
              }}
              className={`transition-all ease-in-out duration-500 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <ChevronDown />
            </button>
          ) : null}
        </div>

        <div
          className={`transition-all ease-in-out duration-500 text-left ${
            expanded
              ? "opacity-100 max-h-[500px] scale-100 mt-2"
              : "opacity-0 max-h-0 scale-95"
          }`}
        >
          {expanded && <p>{data.description}</p>}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id={`t-${id}`}
        isConnectable={false}
      />
      {/* <Handle
        type="source"
        position={Position.Top}
        id={`t-${id}`}
        isConnectable={false}
      /> */}
      <Handle
        type="source"
        position={Position.Bottom}
        id={`b-${id}`}
        isConnectable={false}
      />
      {/* <Handle
        type="target"
        position={Position.Bottom}
        id={`b-${id}`}
        isConnectable={false}
      /> */}
    </>
  )
}
