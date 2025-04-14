import ChatTab from "@/components/network/chat/ChatTab"
import Network from "@/components/network/Network"
import { ReactFlowProvider } from "@xyflow/react"

export default function Home() {
  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }} className="relative">
        <ChatTab />
        <ReactFlowProvider>
          <Network />
        </ReactFlowProvider>
      </div>
    </>
  )
}
