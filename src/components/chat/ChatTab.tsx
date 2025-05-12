"use client"
import { CircleArrowUp } from "lucide-react"
import { useState } from "react"

import Image from "next/image"
import ChatMessage from "./ChatMessage"
import ChatPill from "./ChatPill"

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
      className={`font-sourceSans3 absolute inset-0 ${open ? "translate-y-0" : "translate-y-full"} z-20 flex flex-col overflow-hidden rounded-t-3xl transition-all duration-300 ease-in-out`}
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
          <div className="flex flex-1 flex-col gap-4">
            <ChatMessage type="Chat" message="lorem ipsum" />
            <ChatMessage type="User" message="lorem ipsum" />
          </div>
          <div className="grid gap-4">
            <div className="w-full overflow-x-auto">
              <div className="flex gap-4">
                <ChatPill text="Common treatments for menopause" />
                <ChatPill text="Common treatments for menopause" />
                <ChatPill text="Common treatments for menopause" />
                <ChatPill text="Common treatments for menopause" />
                <ChatPill text="Common treatments for menopause" />
                <ChatPill text="Common treatments for menopause" />
              </div>
            </div>
            <form
              className="flex items-end rounded-3xl border-2 border-black px-4 py-2"
              onSubmit={handleSubmit}
            >
              <textarea
                placeholder="Ask a question"
                rows={1}
                className="w-full resize-none overflow-hidden bg-transparent outline-none"
                onInput={(e) => {
                  e.currentTarget.style.height = "auto"
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                }}
              />
              <button type="submit" className="ml-2">
                <CircleArrowUp />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
