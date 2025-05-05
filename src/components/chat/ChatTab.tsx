"use client"
import { ArrowLeft, CircleArrowUp, MessageSquare } from "lucide-react"
import { useState } from "react"
import ChatPill from "./ChatPill"
import Image from "next/image"

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
        className={`${open ? "h-screen" : "h-0"} fixed bottom-0 z-10 flex w-full flex-col overflow-hidden rounded-t-lg bg-[#e3e3e3] transition-all duration-300 ease-in-out`}
      >
        <div
          className="relative flex items-center justify-between bg-[#d9d9d9] px-4 py-5 hover:cursor-pointer"
          onClick={handleClick}
        >
          <ArrowLeft />
          <div className="absolute left-1/2 h-full w-32 -translate-x-1/2">
            <Image
              // className="object-contain"
              src="/full-logo.png"
              alt="Menolearn Logo"
              fill
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
    </>
  )
}
