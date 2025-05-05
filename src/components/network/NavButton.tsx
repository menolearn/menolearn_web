export default function NavButton({
  label,
  onClick,
  icon,
  iconPlacement,
}: {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  iconPlacement?: "left" | "right"
}) {
  return (
    <button
      onClick={onClick}
      className="bg-nodeBg border-nodeBorder flex items-center gap-2 rounded-3xl border-4 px-5 py-3 text-lg font-semibold"
    >
      {iconPlacement == "left" && icon}
      {label}
      {iconPlacement == "right" && icon}
    </button>
  )
}
