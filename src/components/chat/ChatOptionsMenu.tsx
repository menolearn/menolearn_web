"use client"

import { Plus } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import options from "@/data/chatOptions.json"

export default function ChatOptionsMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`flex items-center justify-center transition-all duration-500 ease-in-out ${
          open ? "rotate-180" : ""
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Plus />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-48 -translate-x-6 rounded-md border border-gray-200 bg-white shadow-md">
          <ul className="text-md p-2 text-gray-800">
            {options.map((option, index) => (
              <li
                className="cursor-pointer px-3 py-1 hover:bg-gray-100"
                key={index}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
