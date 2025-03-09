import { quadtree, Quadtree } from "d3-quadtree"

interface Node {
  x: number
  y: number
  vx?: number
  vy?: number
  measured: { width: number; height: number }
}

type ForceFunction = {
  (alpha: number): void
  initialize: (newNodes: Node[]) => void
}

export function collide(): ForceFunction {
  let nodes: Node[] = []

  const force: ForceFunction = ((alpha: number) => {
    const tree: Quadtree<Node> = quadtree(
      nodes,
      (d) => d.x,
      (d) => d.y
    )

    for (const node of nodes) {
      const halfWidth = node.measured.width / 2
      const halfHeight = node.measured.height / 2
      const nx1 = node.x - halfWidth
      const nx2 = node.x + halfWidth
      const ny1 = node.y - halfHeight
      const ny2 = node.y + halfHeight

      tree.visit((quad, x1, y1, x2, y2) => {
        if (!quad.length) {
          let q: typeof quad | undefined = quad
          do {
            if (q?.data && q.data !== node) {
              const other = q.data
              const otherHalfWidth = other.measured.width / 2
              const otherHalfHeight = other.measured.height / 2

              if (
                node.x - halfWidth < other.x + otherHalfWidth &&
                node.x + halfWidth > other.x - otherHalfWidth &&
                node.y - halfHeight < other.y + otherHalfHeight &&
                node.y + halfHeight > other.y - otherHalfHeight
              ) {
                // Compute overlap
                const dx = node.x - other.x || 0.01
                const dy = node.y - other.y || 0.01
                const absDx = Math.abs(dx)
                const absDy = Math.abs(dy)

                const overlapX = halfWidth + otherHalfWidth - absDx
                const overlapY = halfHeight + otherHalfHeight - absDy

                if (overlapX > 0 && overlapY > 0) {
                  if (overlapX < overlapY) {
                    // Resolve along x-axis
                    const shift = overlapX * alpha
                    node.x += dx > 0 ? shift : -shift
                    other.x -= dx > 0 ? shift : -shift
                  } else {
                    // Resolve along y-axis
                    const shift = overlapY * alpha
                    node.y += dy > 0 ? shift : -shift
                    other.y -= dy > 0 ? shift : -shift
                  }
                }
              }
            }
          } while ((q = q.next))
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
      })
    }
  }) as ForceFunction

  force.initialize = (newNodes: Node[]) => {
    nodes = newNodes
  }

  return force
}

export default collide
