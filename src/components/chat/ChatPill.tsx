import { MessageSquare } from "lucide-react"
import Image from "next/image"

export default function ChatPill({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-3xl bg-[#d9d9d9] px-5 py-3"
    >
      <div className="flex items-center gap-3 text-xl font-bold">
        <Image src="/logo.svg" alt="Menolearn Logo" width={50} height={50} />
        <div>Ask</div>
      </div>
    </button>
  )
}
