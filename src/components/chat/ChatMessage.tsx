import Image from "next/image"

export default function ChatMessage({
  message,
  type,
}: {
  message: string
  type: "Chat" | "User"
}) {
  return (
    <div
      className={`${type == "Chat" ? "self-start bg-gradient-to-b from-[#D1DBE3] to-[#91BBD5]" : "self-end bg-gradient-to-t from-[#D9D1DE] to-[#AC91D5]"} rounded-[14px] p-[3px]`}
    >
      <div className={`flex items-center gap-3 rounded-xl bg-white px-4 py-3`}>
        {type == "Chat" && (
          <Image
            src="/MenolearnChatIcon.svg"
            alt="Menolearn Logo"
            width={40}
            height={40}
          />
        )}
        <div className="flex-1">
          <div
            className={`${type == "User" ? "text-right" : "text-left"} font-sourceSans3 font-medium text-gray-800`}
          >
            {message}
          </div>
        </div>
        {type == "User" && (
          <Image src="/UserIcon.svg" alt="User icon" width={36} height={36} />
        )}
      </div>
    </div>
  )
}
