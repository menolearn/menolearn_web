"use client"
import ChatButton from "@/components/chat/ChatButton"
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
    <div>
      <div className="flex h-screen flex-col">
        <NavBar />

        <div className="relative flex-1">
          <ReactFlowProvider>
            <Network chatOpen={chatOpen} />
          </ReactFlowProvider>
          <ChatTab
            handleChatTopBarClick={handleChatTopBarClick}
            open={chatOpen}
          />
        </div>
      </div>
      <ChatButton handleClick={handleChatPillClick} />
    </div>
  )
}
