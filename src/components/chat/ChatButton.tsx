import Image from "next/image"

export default function ChatButton({
  handleClick,
}: {
  handleClick: () => void
}) {
  return (
    <button
      onClick={handleClick}
      className="rounded-3xl bg-[#d9d9d9] px-5 py-3"
    >
      <div className="flex items-center gap-3 text-xl font-bold">
        <Image src="/logo.svg" alt="Menolearn Logo" width={50} height={50} />
        <div>Ask</div>
      </div>
    </button>
  )
}
