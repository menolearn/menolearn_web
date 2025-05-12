"use client"
import { useState, useActionState } from "react"

import Image from "next/image"
import ChatMessage from "./ChatMessage"
import ChatPill from "./ChatPill"
import ChatInput from "./ChatInput"

import submitToOpenAI from "@/app/actions"

export default function ChatTab({
  handleChatTopBarClick,
  open,
}: {
  handleChatTopBarClick: () => void
  open: boolean
}) {
  const [suggestions, setSuggestions] = useState<string[]>([
    "Common treatments for menopause",
    "What is HRT",
    "Common treatments for menopause",
    "What is HRT",
    "Common treatments for menopause",
    "What is HRT",
  ])
  const [result, formAction] = useActionState(submitToOpenAI, null)
  console.log(result)

  return (
    <div
      className={`font-source-sans3 absolute inset-0 bg-radial-[at_50%_75%] from-[#F4F1FF] to-[#DAEFFF] ${open ? "translate-y-0" : "translate-y-full"} z-20 flex flex-col overflow-hidden rounded-t-3xl transition-all duration-300 ease-in-out`}
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
              <div className="flex items-center gap-4">
                {suggestions.map((s, idx) => (
                  <ChatPill text={s} key={idx} />
                ))}
              </div>
            </div>
            <ChatInput submitAction={formAction} />
          </div>
        </div>
      )}
    </div>
  )
}
