import { CircleArrowUp } from "lucide-react"
import ChatOptionsMenu from "./ChatOptionsMenu"
import OpenAI from "openai"

export default function ChatInput({ submitAction }: { submitAction: any }) {
  return (
    <div className="rounded-[26px] bg-linear-to-r from-[#86BBDE] to-[#6D618E] p-[3px]">
      <form
        className="flex items-center gap-2 rounded-3xl bg-white px-4 py-2"
        action={submitAction}
      >
        <ChatOptionsMenu />

        <textarea
          name="prompt"
          placeholder="Ask a question"
          rows={1}
          className="max-h-36 w-full resize-none overflow-auto bg-transparent outline-hidden"
          onInput={(e) => {
            e.currentTarget.style.height = "auto"
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
          }}
        />
        <button type="submit">
          <CircleArrowUp />
        </button>
      </form>
    </div>
  )
}
