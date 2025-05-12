import ModalOverlay from "@/components/modals/Modal"
import { allNodes } from "@/data/nodes"

export default async function NodeDescriptionModal({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const node = allNodes.find((n) => n.id == id)
  if (!node) return null

  return (
    <ModalOverlay>
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-xl bg-white px-6 py-3">
          <p className="text-center text-xl font-bold">{node.data.label}</p>
        </div>
        <div className="max-w-sm rounded-xl bg-white px-6 py-4 font-medium">
          {node.data.description}
        </div>
      </div>
    </ModalOverlay>
  )
}
