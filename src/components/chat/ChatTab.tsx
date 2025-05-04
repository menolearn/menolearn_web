"use client"
import { ArrowLeft, CircleArrowUp, MessageSquare } from "lucide-react"
import { useState } from "react"
import ChatPill from "./ChatPill"

export default function ChatTab({
  handleClick,
  open,
}: {
  handleClick: () => void
  open: boolean
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submit")
  }

  return (
    <>
      <div
        className={`${open ? "h-[90%]" : "h-0"} fixed bottom-0 z-10 flex w-full flex-col overflow-hidden rounded-t-lg bg-red-500 transition-all duration-300 ease-in-out`}
      >
        <div
          className="flex items-center justify-between bg-red-700 px-4 py-5 hover:cursor-pointer"
          onClick={handleClick}
        >
          <ArrowLeft className={`${open ? "opacity-100" : "opacity-0"}`} />
          <div>Chat Tab</div>
          <MessageSquare />
        </div>

        {open && (
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">Chat Messages</div>
            <form
              className="flex rounded-xl border-2 border-black px-4 py-2"
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
    </>
  )
}
