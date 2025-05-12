import { Menu } from "lucide-react"
export default function NavBar() {
  return (
    <div className="z-10 flex w-full items-center justify-between bg-white px-5 py-4 shadow-md">
      <div className="flex items-center gap-3 hover:cursor-pointer">
        <img src="/logo.svg" alt="Menolearn Logo" width={50} height={50} />
        <div className="text-xl font-bold">Menolearn</div>
      </div>
      <button>
        <Menu />
      </button>
    </div>
  )
}
