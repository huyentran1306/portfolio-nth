import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useSystemStore, type DebugLog } from '@/store/system'

const LEVEL_STYLE: Record<DebugLog['level'], string> = {
  INFO:    'text-sky-400',
  DEBUG:   'text-gray-400',
  WARN:    'text-yellow-400',
  ERROR:   'text-red-400',
  SUCCESS: 'text-green-400',
}
const LEVEL_BG: Record<DebugLog['level'], string> = {
  INFO:    'bg-sky-400/10 text-sky-400',
  DEBUG:   'bg-gray-500/10 text-gray-400',
  WARN:    'bg-yellow-400/10 text-yellow-400',
  ERROR:   'bg-red-400/10 text-red-400',
  SUCCESS: 'bg-green-400/10 text-green-400',
}

// Periodic synthetic log generator
const PERIODIC_LOGS: Array<{ level: DebugLog['level']; msg: string }> = [
  { level: 'DEBUG', msg: 'Rule Engine heartbeat: OK (80/80 rules active)' },
  { level: 'INFO',  msg: 'Service Bus: 142 msgs/sec processed' },
  { level: 'DEBUG', msg: 'Redis PING → PONG (2ms)' },
  { level: 'INFO',  msg: 'AKS pod health check: rule-engine-pod-* [3/3 running]' },
  { level: 'DEBUG', msg: 'Cosmos DB RU usage: 34% (threshold 80%)' },
  { level: 'INFO',  msg: 'Transaction processed: TXN-20241105-8823 → 250pts' },
  { level: 'DEBUG', msg: 'Cache GET CustomerProfile:9981 → HIT (0.3ms)' },
  { level: 'INFO',  msg: 'Rule matched: GOLD_TIER_MULTIPLIER × 1.5' },
]

export default function DebugConsole() {
  const [open, setOpen] = useState(false)
  const { debugLogs, addDebugLog, clearDebugLogs, latency, errorRate, systemStatus } = useSystemStore()
  const scrollRef = useRef<HTMLDivElement>(null)
  const logIdxRef = useRef(0)
  const counter = useSystemStore((s) => s.debugLogCounter)

  // Scroll to top (newest) whenever new logs arrive
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [counter, open])

  // Periodic synthetic logs
  useEffect(() => {
    const interval = setInterval(() => {
      // Skip if currently in error/chaos to avoid spam
      const idx = logIdxRef.current % PERIODIC_LOGS.length
      const entry = PERIODIC_LOGS[idx]
      logIdxRef.current++
      addDebugLog(entry.level, entry.msg)

      // Adaptive: warn on high latency
      if (latency > 500) {
        addDebugLog('WARN', `High latency detected: ${latency}ms (threshold 300ms)`)
      }
      if (errorRate > 5) {
        addDebugLog('ERROR', `Error rate spike: ${errorRate}% (SLA threshold: 1%)`)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [latency, errorRate])

  const newCount = open ? 0 : Math.min(counter, 99)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:left-4 md:right-auto md:w-[480px] md:bottom-4">
      {/* Toggle Bar */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-4 py-2.5 text-left transition-all"
        style={{
          background: 'rgba(3,7,18,0.92)',
          borderTop: '1px solid rgba(99,102,241,0.25)',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 'none',
          backdropFilter: 'blur(20px)',
          borderRadius: open ? '0' : '0',
        }}
        whileHover={{ background: 'rgba(10,14,30,0.96)' } as any}
      >
        <Terminal size={14} className="text-indigo-400 shrink-0" />
        <span className="text-xs font-mono text-indigo-300 tracking-widest">SYSTEM CONSOLE</span>
        {!open && newCount > 0 && (
          <motion.span
            key={newCount}
            className="ml-1 px-1.5 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300"
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            +{newCount}
          </motion.span>
        )}
        <span className="ml-auto text-gray-500">{open ? <ChevronDown size={14} /> : <ChevronUp size={14} />}</span>
        <span className={`w-1.5 h-1.5 rounded-full ${systemStatus === 'error' ? 'bg-red-400' : systemStatus === 'loading' ? 'bg-yellow-400' : 'bg-green-400'}`} />
      </motion.button>

      {/* Log Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 280, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
            style={{
              background: 'rgba(3,7,18,0.97)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderTop: 'none',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center justify-between px-3 py-1.5 border-b" style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
              <div className="flex gap-1.5">
                {(['INFO','WARN','ERROR','SUCCESS','DEBUG'] as DebugLog['level'][]).map((lvl) => (
                  <span key={lvl} className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${LEVEL_BG[lvl]}`}>{lvl}</span>
                ))}
              </div>
              <button onClick={clearDebugLogs} className="text-gray-600 hover:text-gray-400 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>

            <div ref={scrollRef} className="h-[230px] overflow-y-auto px-3 py-2 space-y-0.5 font-mono text-[11px]"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(99,102,241,0.3) transparent' }}>
              <AnimatePresence initial={false}>
                {debugLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    className="flex items-start gap-2 leading-relaxed"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-gray-600 shrink-0 pt-px">{log.time}</span>
                    <span className={`shrink-0 w-14 ${LEVEL_STYLE[log.level]}`}>[{log.level}]</span>
                    <span className="text-gray-300 break-all">{log.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {debugLogs.length === 0 && (
                <span className="text-gray-600">No logs yet...</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
