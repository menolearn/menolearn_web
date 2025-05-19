"use client"
import ChatButton from "@/components/chat/ChatButton"
import ChatTab from "@/components/chat/ChatTab"
import Network from "@/components/network/Network"
import { ReactFlowProvider } from "@xyflow/react"
import { useState } from "react"

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)

  const handleChatPillClick = () => {
    setChatOpen(true)
  }

  const handleChatTopBarClick = () => {
    setChatOpen(!open)
  }

  return (
    <>
      <div
        className="relative flex h-full flex-col"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <ReactFlowProvider>
          <Network chatOpen={chatOpen} />
        </ReactFlowProvider>
        <ChatTab
          handleChatTopBarClick={handleChatTopBarClick}
          open={chatOpen}
        />
      </div>
      <div className="fixed bottom-4 left-1/2 z-10 -translate-x-1/2">
        <ChatButton handleClick={handleChatPillClick} />
      </div>
    </>
  )
}
