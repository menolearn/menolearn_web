export default function ChatPill({ text }: { text: string }) {
  return (
    <button className="shrink-0 rounded-[26px] bg-gradient-to-r from-[#86BBDE] to-[#6D618E] p-[3px] text-left font-medium">
      <div className="max-w-48 rounded-3xl bg-white px-3 py-2 text-sm">
        {text}
      </div>
    </button>
  )
}
