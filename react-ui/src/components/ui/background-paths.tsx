"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-white"
        viewBox="0 0 696 316"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 1, pathOffset: 0, opacity: 0.28 }}
            animate={{
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 28 + path.id * 0.25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

// Only animates while scrolled near the viewport so most of the page's bands stay idle.
function Band() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "600px 0px",
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="background-paths-band" ref={ref}>
      {visible && (
        <div className="absolute inset-0 opacity-[0.14]">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      )}
    </div>
  )
}

export function BackgroundPaths({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#242729] text-[#f3f6f8]">
      <div className="background-paths-art pointer-events-none" aria-hidden="true">
        {Array.from({ length: 12 }, (_, band) => (
          <Band key={band} />
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
