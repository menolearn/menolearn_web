"use client"
import ChatPill from "@/components/chat/ChatPill"
import ChatTab from "@/components/chat/ChatTab"
import Network from "@/components/network/Network"
import { ReactFlowProvider } from "@xyflow/react"
import { useState } from "react"

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)

  const handleChatPillClick = () => {
    setChatOpen(true)
  }

  const handleClick = () => {
    setChatOpen(!open)
  }

  return (
    <>
      <ChatPill handleClick={handleChatPillClick} />
      <div className="font-poppins h-screen w-screen">
        <ChatTab handleClick={handleClick} open={chatOpen} />
        <ReactFlowProvider>
          <Network />
        </ReactFlowProvider>
      </div>
    </>
  )
}
