"use client"
import ChatPill from "@/components/chat/ChatPill"
import ChatTab from "@/components/chat/ChatTab"
import NavBar from "@/components/NavBar"
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
      <div className="flex h-screen flex-col">
        <NavBar />
        <div className="relative flex-1">
          <ReactFlowProvider>
            <Network />
          </ReactFlowProvider>
          <ChatTab
            handleChatTopBarClick={handleChatTopBarClick}
            open={chatOpen}
          />
        </div>
      </div>

      <ChatPill handleClick={handleChatPillClick} />
    </>
  )
}
