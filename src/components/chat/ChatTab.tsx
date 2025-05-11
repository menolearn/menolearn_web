"use client"
import { CircleArrowUp } from "lucide-react"
import { useState } from "react"

import Image from "next/image"

export default function ChatTab({
  handleChatTopBarClick,
  open,
}: {
  handleChatTopBarClick: () => void
  open: boolean
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submit")
  }

  return (
    <div
      style={{
        background: "radial-gradient(ellipse at top, #F4F1FF 0%, #DAEFFF 100%)",
      }}
      className={`absolute inset-0 ${open ? "translate-y-0" : "translate-y-full"} z-20 flex flex-col overflow-hidden rounded-t-xl transition-all duration-300 ease-in-out`}
    >
      <div
        className="flex items-center justify-center border-b-2 border-b-[#CDCAD6] hover:cursor-pointer"
        onClick={handleChatTopBarClick}
      >
        <div className="relative mx-auto h-16 w-32">
          <Image
            src="/full-logo.png"
            alt="Menolearn Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {open && (
        <div className="flex flex-1 flex-col p-4">
          <div className="flex-1">Chat Messages</div>
          <form
            className="flex rounded-full border-2 border-black px-4 py-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Ask a question"
              className="w-full bg-transparent outline-none"
            />
            <button type="submit">
              <CircleArrowUp />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
