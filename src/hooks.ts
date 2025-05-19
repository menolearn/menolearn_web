import { useEffect, useRef, useMemo, useState } from "react"
import { useReactFlow, useNodesInitialized } from "@xyflow/react"
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  Simulation,
} from "d3-force"
import collide from "@/components/network/collide"
import type { NetworkNodeType, DragEvents } from "@/types"
import type { Edge } from "@xyflow/react"

export function useLayoutedElements() {
  const { getNodes, getEdges, setNodes, fitView } = useReactFlow<
    NetworkNodeType,
    Edge
  >()
  const initialized = useNodesInitialized()

  // keep simulation instance here
  const simRef = useRef<Simulation<NetworkNodeType, undefined> | null>(null)

  // your running flag and a ref that always mirrors it
  const [running, setRunning] = useState(true)
  const runningRef = useRef(running)
  useEffect(() => {
    runningRef.current = running
  }, [running])

  // your drag handlers (unchanged)
  const draggingNodeRef = useRef<NetworkNodeType | null>(null)
  const dragEvents: DragEvents = useMemo(
    () => ({
      start: (_e, node) => {
        draggingNodeRef.current = node
      },
      drag: (_e, node) => {
        draggingNodeRef.current = node
      },
      stop: () => {
        draggingNodeRef.current = null
      },
    }),
    [],
  )

  // rebuild the sim whenever nodes or edges change
  useEffect(() => {
    if (!initialized) return

    // tear down old sim
    simRef.current?.stop()

    // grab fresh data
    const nodes = (getNodes() as NetworkNodeType[]).map((n) => ({
      ...n,
      x: n.position.x,
      y: n.position.y,
    }))
    const edges = getEdges()

    // create new sim
    const sim = forceSimulation<NetworkNodeType>(nodes)
      .force(
        "link",
        forceLink(edges)
          .id((d: any) => d.id)
          .distance(250)
          .strength(0.02),
      )
      .force("charge", forceManyBody().strength(-800))
      .force("x", forceX().x(0).strength(0.02))
      .force("y", forceY().y(0).strength(0.05))
      .force("collide", collide() as any)
      .alphaTarget(0.05)

    sim.on("tick", () => {
      const updated = sim.nodes().map((n) => {
        if (draggingNodeRef.current?.id === n.id) {
          n.fx = draggingNodeRef.current.position.x
          n.fy = draggingNodeRef.current.position.y
        } else {
          delete n.fx
          delete n.fy
        }
        return {
          ...n,
          position: { x: n.x!, y: n.y! },
          x: n.x!,
          y: n.y!,
        }
      })
      setNodes(updated)
    })

    simRef.current = sim

    // only start it if you were “running” before
    if (runningRef.current) {
      sim.alpha(0.05).restart()
    } else {
      sim.stop()
    }

    // clean up on unmount or deps change
    return () => {
      sim.stop()
      sim.on("tick", null)
      simRef.current = null
    }
  }, [initialized, getNodes, getEdges, setNodes, fitView])

  // controls
  const start = () => {
    if (simRef.current && !runningRef.current) {
      const freshNodes = getNodes().map((n) => ({
        ...n,
        x: n.position.x,
        y: n.position.y,
      }))

      simRef.current.nodes(freshNodes)
      simRef.current.alpha(0.05).restart()
      setRunning(true)
    }
  }

  const stop = () => {
    if (simRef.current && runningRef.current) {
      simRef.current.stop()
      setRunning(false)
    }
  }

  return { dragEvents, start, stop, running }
}
