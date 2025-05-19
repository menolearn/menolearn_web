import Image from "next/image"

export default function ChatButton({
  handleClick,
}: {
  handleClick: () => void
}) {
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer rounded-[27px] bg-linear-to-r from-[#86BBDE] to-[#6D618E] p-[4px]"
    >
      <div className="flex items-center gap-3 rounded-3xl bg-white px-4 py-[10px] text-xl font-bold">
        <Image src="/logo.svg" alt="Menolearn Logo" width={50} height={50} />
        <div>Ask</div>
      </div>
    </button>
  )
}
