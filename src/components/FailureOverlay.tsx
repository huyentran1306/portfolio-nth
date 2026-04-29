import { motion, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/store/system'

const GLITCH_LOGS = [
  '[ERROR] Service Bus queue depth: 9,842 (threshold: 1000)',
  '[WARN]  Rule Engine timeout after 3200ms',
  '[ERROR] Cosmos DB RU exhausted — throttling writes',
  '[WARN]  Cache hit rate dropped to 12%',
  '[ERROR] Instance B: health check failed',
  '[WARN]  Retry storm detected: 3,200 req/s retry loop',
  '[ERROR] Dead letter queue overflow — rewards lost',
  '[INFO]  PagerDuty alert sent to on-call',
]

export function FailureOverlay() {
  const { failureMode } = useSystemStore()

  return (
    <AnimatePresence>
      {failureMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 pointer-events-none"
        >
          {/* Red vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-red-900/20" />

          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.15) 2px, rgba(255,0,0,0.15) 4px)',
            }}
          />

          {/* Error log stream (bottom-left) */}
          <div className="absolute bottom-6 left-6 w-80 space-y-1 font-mono text-[10px]">
            {GLITCH_LOGS.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className={log.startsWith('[ERROR]') ? 'text-red-400' : 'text-yellow-400/80'}
              >
                {log}
              </motion.div>
            ))}
          </div>

          {/* INCIDENT badge */}
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-20 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold uppercase tracking-widest"
          >
            ⚠ INCIDENT ACTIVE — P1
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
