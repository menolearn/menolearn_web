export default function ChatPill({
  text,
  onClick,
}: {
  text: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer rounded-[26px] bg-linear-to-r from-[#86BBDE] to-[#6D618E] p-[3px]"
    >
      <div className="flex h-full w-48 items-center justify-center rounded-3xl bg-white px-3 py-2 text-center text-sm font-medium">
        <p>{text}</p>
      </div>
    </button>
  )
}
