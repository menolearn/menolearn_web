import { quadtree, Quadtree } from "d3-quadtree"

interface Node {
  x: number // top-left X
  y: number // top-left Y
  vx?: number
  vy?: number
  measured: { width: number; height: number }
  cx?: number // center X
  cy?: number // center Y
}

type ForceFunction = {
  (alpha: number): void
  initialize: (newNodes: Node[]) => void
}

export function collide(): ForceFunction {
  let nodes: Node[] = []

  const force = ((alpha: number) => {
    if (nodes.length === 0) return

    // 1) compute true centers
    for (const n of nodes) {
      n.cx = n.x + n.measured.width / 2
      n.cy = n.y + n.measured.height / 2
    }

    // 2) build quadtree on centers
    const tree: Quadtree<Node> = quadtree(
      nodes,
      (d) => d.cx!,
      (d) => d.cy!,
    )

    // 3) collision pass on centers
    for (const node of nodes) {
      const hw = node.measured.width / 2 + 10
      const hh = node.measured.height / 2 + 10
      const xMin = node.cx! - hw
      const xMax = node.cx! + hw
      const yMin = node.cy! - hh
      const yMax = node.cy! + hh

      tree.visit((quad, x1, y1, x2, y2) => {
        // skip non-overlapping quadrants
        if (x2 < xMin || x1 > xMax || y2 < yMin || y1 > yMax) {
          return true
        }
        if (!quad.length) {
          let q: typeof quad | null = quad
          while (q) {
            const other = q.data
            if (other && other !== node) {
              const ohw = other.measured.width / 2 + 10
              const ohh = other.measured.height / 2 + 10

              // edge-to-edge overlap on centers
              const overlapX =
                Math.min(xMax, other.cx! + ohw) -
                Math.max(xMin, other.cx! - ohw)
              const overlapY =
                Math.min(yMax, other.cy! + ohh) -
                Math.max(yMin, other.cy! - ohh)

              if (overlapX > 0 && overlapY > 0) {
                const dx = node.cx! - other.cx! || 0.01
                const dy = node.cy! - other.cy! || 0.01

                if (overlapX < overlapY) {
                  const shift = (overlapX * alpha) / 2
                  node.cx! += dx > 0 ? shift : -shift
                  other.cx! -= dx > 0 ? shift : -shift
                } else {
                  const shift = (overlapY * alpha) / 2
                  node.cy! += dy > 0 ? shift : -shift
                  other.cy! -= dy > 0 ? shift : -shift
                }
              }
            }
            q = q.next as any
          }
        }
        return false
      })
    }

    // 4) write centers back to top-left positions
    for (const n of nodes) {
      n.x = n.cx! - n.measured.width / 2
      n.y = n.cy! - n.measured.height / 2
    }
  }) as ForceFunction

  force.initialize = (newNodes: Node[]) => {
    nodes = newNodes
    for (const n of nodes) {
      n.cx = n.x + n.measured.width / 2
      n.cy = n.y + n.measured.height / 2
    }
  }

  return force
}

export default collide
