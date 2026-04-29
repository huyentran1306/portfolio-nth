import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const trailX = useSpring(mx, { stiffness: 80, damping: 18 })
  const trailY = useSpring(my, { stiffness: 80, damping: 18 })
  const isHovering = useRef(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      isHovering.current = !!(
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]')
      )
      if (cursorRef.current) {
        cursorRef.current.style.transform = isHovering.current
          ? 'translate(-50%, -50%) scale(2)'
          : 'translate(-50%, -50%) scale(1)'
        cursorRef.current.style.opacity = isHovering.current ? '0.5' : '1'
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [mx, my])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      {/* Trail dot (lags behind) */}
      <motion.div
        style={{ left: trailX, top: trailY }}
        className="pointer-events-none fixed z-[9999] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/40"
      />
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        style={{ left: mx, top: my }}
        className="pointer-events-none fixed z-[9999] w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] transition-transform duration-150"
      />
    </>
  )
}
