"use client"
import { useState, useActionState, useEffect, useRef } from "react"

import Image from "next/image"
import ChatMessage from "./ChatMessage"
import ChatPill from "./ChatPill"

import submitToOpenAI from "@/app/actions"
import ChatOptionsMenu from "./ChatOptionsMenu"
import { CircleArrowUp } from "lucide-react"
import { ResponseOutputText } from "openai/resources/responses/responses.mjs"

interface ChatMessage {
  type: "User" | "Chat"
  message: string
}

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
  const [input, setInput] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [result, formAction] = useActionState(submitToOpenAI, null)

  useEffect(() => {
    if (result && result[0].type == "output_text") {
      setChatHistory((prev) => [
        ...prev,
        { type: "Chat", message: (result[0] as ResponseOutputText).text },
      ])
    }
  }, [result])

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  console.log(chatHistory)

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
        <div className="flex h-full min-h-0 flex-1 flex-col p-4">
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
            {chatHistory.map((message, idx) => (
              <ChatMessage
                key={idx}
                type={message.type}
                message={message.message}
              />
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="mt-4 grid gap-4">
            <div className="w-full overflow-x-auto">
              <div className="flex items-center gap-4">
                {suggestions.map((s, idx) => (
                  <ChatPill text={s} key={idx} />
                ))}
              </div>
            </div>
            {/* Chat input */}
            <div className="rounded-[26px] bg-linear-to-r from-[#86BBDE] to-[#6D618E] p-[3px]">
              <form
                className="flex items-center gap-2 rounded-3xl bg-white px-4 py-2"
                action={formAction}
                onSubmit={() => {
                  if (!input) return

                  setChatHistory((prev) => [
                    ...prev,
                    { type: "User", message: input },
                  ])
                  setInput("")
                }}
              >
                <ChatOptionsMenu />

                <textarea
                  name="prompt"
                  value={input}
                  placeholder="Ask a question"
                  rows={1}
                  className="max-h-36 w-full resize-none overflow-auto bg-transparent outline-hidden"
                  onInput={(e) => {
                    e.currentTarget.style.height = "auto"
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                  }}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="cursor-pointer">
                  <CircleArrowUp />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
