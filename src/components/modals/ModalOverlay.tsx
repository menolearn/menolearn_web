"use client"

import { useRouter } from "next/navigation"

export default function ModalOverlay({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={() => router.back()}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
