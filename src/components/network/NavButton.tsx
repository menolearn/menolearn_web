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
      className="bg-node-bg border-node-border text-md flex cursor-pointer items-center gap-2 rounded-3xl border-4 px-4 py-2 font-semibold"
    >
      {iconPlacement == "left" && icon}
      {label}
      {iconPlacement == "right" && icon}
    </button>
  )
}
