"use client"
import {
  useState,
  useActionState,
  useEffect,
  useRef,
  useTransition,
} from "react"

import Image from "next/image"
import ChatMessage from "./ChatMessage"
import ChatPill from "./ChatPill"

import submitToOpenAI from "@/app/actions"
import ChatOptionsMenu from "./ChatOptionsMenu"
import { ArrowUp, CircleArrowUp } from "lucide-react"
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
    "How can hormone therapy help with menopause",
    "What is progesterone",
    "Common treatments for menopause",
    "What is HRT",
  ])
  const [input, setInput] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [result, formAction, formSubmitPending] = useActionState(
    submitToOpenAI,
    null,
  )
  const [isPending, startTransition] = useTransition()

  // Detect formAction results
  useEffect(() => {
    if (result && result[0].type == "output_text") {
      setChatHistory((prev) => [
        ...prev,
        { type: "Chat", message: (result[0] as ResponseOutputText).text },
      ])
    }
  }, [result])

  // Scrolling
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  // Suggestion clicks
  const handleSuggestionClick = (text: string) => {
    const formData = new FormData()
    formData.append("prompt", text)

    setChatHistory((prev) => [...prev, { type: "User", message: text }])

    startTransition(async () => {
      const res = await submitToOpenAI(undefined, formData)
      if (res && res[0].type == "output_text") {
        setChatHistory((prev) => [
          ...prev,
          { type: "Chat", message: (res[0] as ResponseOutputText).text },
        ])
      }
    })
  }

  return (
    <div
      className={`font-source-sans3 fixed top-[4rem] right-0 bottom-0 left-0 z-20 flex flex-col overflow-hidden rounded-t-3xl bg-radial-[at_50%_25%] from-[#F4F1FF] from-40% to-[#DAEFFF] transition-transform duration-300 ease-in-out ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
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
              <div className="flex items-stretch gap-4">
                {suggestions.map((s, idx) => (
                  <ChatPill
                    text={s}
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                  />
                ))}
              </div>
            </div>
            {/* Chat input */}
            <div className="rounded-[26px] bg-linear-to-r from-[#86BBDE] to-[#6D618E] p-[3px]">
              <form
                className="flex items-center gap-2 rounded-3xl bg-white px-4 py-1"
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
                  className="max-h-36 flex-1 resize-none overflow-auto bg-transparent outline-hidden"
                  onInput={(e) => {
                    e.currentTarget.style.height = "auto"
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                  }}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-[#86BBDE] to-[#6D618E] p-[3px]"
                >
                  <ArrowUp color="white" strokeWidth={3} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
