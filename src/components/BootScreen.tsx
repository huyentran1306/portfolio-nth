import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  '> Initializing HuyenTran.Portfolio v2024...',
  '> Loading system architecture modules...',
  '> Connecting to Azure AKS cluster...',
  '> Bootstrapping Rule Engine v3.2...',
  '> Syncing 500k+ user session data...',
  '> All systems operational ✓',
]

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setLines((prev) => [...prev, BOOT_LINES[i]])
      i++
      if (i >= BOOT_LINES.length) {
        clearInterval(id)
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 600)
        }, 400)
      }
    }, 220)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] bg-[#06060c] flex flex-col items-center justify-center p-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <div className="text-2xl font-bold text-white mb-1">
              Huyen Tran<span className="text-[#818cf8]">.</span>
            </div>
            <div className="text-xs text-[#444466] uppercase tracking-[0.3em]">Tech Lead · FPT Software</div>
          </motion.div>

          {/* Terminal */}
          <div className="w-full max-w-md bg-[#0d0d1c] border border-[#1a1a30] rounded-2xl p-6 font-mono text-xs text-[#8888aa] space-y-2">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a1a30]">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-[#444466]">portfolio.sh</span>
            </div>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={i === lines.length - 1 && lines.length === BOOT_LINES.length
                  ? 'text-emerald-400'
                  : 'text-[#8888aa]'}
              >
                {line}
              </motion.div>
            ))}
            {lines.length < BOOT_LINES.length && (
              <div className="boot-cursor text-[#818cf8]" />
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-6 w-full max-w-md h-0.5 bg-[#1a1a30] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#818cf8] to-[#c084fc]"
              initial={{ width: '0%' }}
              animate={{ width: `${(lines.length / BOOT_LINES.length) * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
