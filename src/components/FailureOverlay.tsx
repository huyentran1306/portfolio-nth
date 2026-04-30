import { useEffect } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { useSystemStore } from '@/store/system'

const COLLAPSE_EVENTS = [
  { t: 0,    icon: '💥', msg: 'Queue depth exceeded threshold: 9,842 msgs' },
  { t: 400,  icon: '🔴', msg: 'Pod crash detected — rule-engine-pod-3xk7' },
  { t: 800,  icon: '⚡', msg: 'Cache eviction storm: 72,000 keys/sec' },
  { t: 1200, icon: '🌡️', msg: 'DB Cosmos RU throttling at 95% capacity' },
  { t: 1600, icon: '💀', msg: 'CIRCUIT BREAKER OPEN — all routes rejected' },
]

const RECOVER_EVENTS = [
  { t: 0,    icon: '🔍', msg: 'Runbook triggered: INC-2024-P1-AUTO' },
  { t: 600,  icon: '🏥', msg: 'Draining Service Bus queue...' },
  { t: 1400, icon: '♻️', msg: 'Restarting pods with backoff strategy' },
  { t: 2200, icon: '📊', msg: 'Cache warming: hit rate recovering (40%→87%)' },
  { t: 3200, icon: '✅', msg: 'All health probes passing — closing incident' },
]

export default function FailureOverlay() {
  const { failureMode, recoveryStage, toggleFailureMode, startRecovery } = useSystemStore()
  const active = failureMode || recoveryStage === 'recovering' || recoveryStage === 'recovered'

  const isCollapsed = failureMode && recoveryStage === 'collapsed'
  const isRecovering = recoveryStage === 'recovering'
  const isRecovered = recoveryStage === 'recovered'

  const progress = useSpring(0, { stiffness: 60, damping: 18 })
  const progressWidth = useTransform(progress, [0, 100], ['0%', '100%'])

  useEffect(() => {
    if (isRecovering) {
      progress.set(0)
      const timer = setTimeout(() => progress.set(100), 200)
      return () => clearTimeout(timer)
    }
    if (!active) progress.set(0)
  }, [isRecovering, active])

  if (!active) return null

  return (
    <AnimatePresence>
      <motion.div
        key="failure-overlay"
        className="fixed inset-0 z-[60] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: isRecovered
              ? 'radial-gradient(ellipse at center, transparent 40%, rgba(16,185,129,0.08) 100%)'
              : isRecovering
                ? 'radial-gradient(ellipse at center, transparent 30%, rgba(16,185,129,0.06) 100%)'
                : 'radial-gradient(ellipse at center, transparent 20%, rgba(220,38,38,0.25) 100%)',
          }}
          animate={{ opacity: isCollapsed ? [0.6, 1, 0.7, 1] : 1 }}
          transition={{ duration: 0.3, repeat: isCollapsed ? Infinity : 0, repeatType: 'mirror' }}
        />

        {isCollapsed && (
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.05) 2px, rgba(255,0,0,0.05) 4px)' }} />
        )}

        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-auto">
          <motion.div
            className="rounded-2xl border backdrop-blur-xl overflow-hidden"
            style={{
              background: isRecovered || isRecovering ? 'rgba(6,15,10,0.92)' : 'rgba(20,4,4,0.92)',
              borderColor: isRecovered ? 'rgba(16,185,129,0.5)' : isRecovering ? 'rgba(16,185,129,0.3)' : 'rgba(220,38,38,0.6)',
            }}
            initial={{ y: -40, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            <div className="px-4 py-3 flex items-center gap-3"
              style={{
                borderBottom: isRecovered || isRecovering ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(220,38,38,0.3)',
                background: isRecovered ? 'rgba(16,185,129,0.08)' : isRecovering ? 'rgba(16,185,129,0.04)' : 'rgba(220,38,38,0.08)',
              }}>
              <motion.div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: isRecovered ? '#10b981' : isRecovering ? '#f59e0b' : '#ef4444' }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ repeat: isRecovered ? 0 : Infinity, duration: 0.8 }}
              />
              <span className="text-xs font-mono font-bold tracking-widest"
                style={{ color: isRecovered ? '#10b981' : isRecovering ? '#f59e0b' : '#ef4444' }}>
                {isRecovered ? '✓ INCIDENT RESOLVED' : isRecovering ? '⟳ RECOVERING...' : '⚠ P1 INCIDENT ACTIVE'}
              </span>
              {failureMode && (
                <button onClick={toggleFailureMode} className="ml-auto text-xs opacity-50 hover:opacity-100 text-gray-400 transition-opacity">
                  [dismiss]
                </button>
              )}
            </div>

            {(isRecovering || isRecovered) && (
              <div className="h-1.5 bg-gray-800 overflow-hidden">
                <motion.div className="h-full" style={{ width: progressWidth, background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
              </div>
            )}

            <div className="p-4 space-y-1 max-h-52 overflow-y-auto">
              {(isCollapsed ? COLLAPSE_EVENTS : RECOVER_EVENTS).map((ev, i) => (
                <motion.div key={`${recoveryStage}-${i}`}
                  className="flex items-start gap-2 text-xs font-mono"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ev.t / 1000, duration: 0.25 }}>
                  <span>{ev.icon}</span>
                  <span style={{ color: isCollapsed ? '#f87171' : '#6ee7b7' }}>{ev.msg}</span>
                </motion.div>
              ))}
            </div>

            <div className="px-4 pb-4 flex gap-2">
              {isCollapsed && (
                <motion.button onClick={startRecovery}
                  className="flex-1 py-2 rounded-lg text-xs font-mono font-bold tracking-wider"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)' }}
                  whileHover={{ background: 'rgba(16,185,129,0.3)' } as any}
                  whileTap={{ scale: 0.97 }}>
                  ▶ TRIGGER RECOVERY
                </motion.button>
              )}
              {isRecovered && (
                <motion.button onClick={() => useSystemStore.setState({ recoveryStage: 'normal' })}
                  className="flex-1 py-2 rounded-lg text-xs font-mono tracking-wider"
                  style={{ background: 'rgba(16,185,129,0.1)', color: '#6ee7b7', border: '1px solid rgba(16,185,129,0.3)' }}
                  whileHover={{ background: 'rgba(16,185,129,0.2)' } as any}
                  whileTap={{ scale: 0.97 }}>
                  ✓ CLOSE INCIDENT
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
