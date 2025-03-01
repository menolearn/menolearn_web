import Network from "@/components/network/Network"
import { ReactFlowProvider } from "@xyflow/react"

export default function Home() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ReactFlowProvider>
        <Network />
      </ReactFlowProvider>
    </div>
  )
}
