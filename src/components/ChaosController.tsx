import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, X } from 'lucide-react'
import { useSystemStore } from '@/store/system'

const CASCADE_EVENTS = [
  { icon: '📨', label: 'Queue Overflow',   desc: 'Service Bus depth: 9.8k' },
  { icon: '🗑️', label: 'Cache Eviction',   desc: 'Hit rate: 87% → 12%' },
  { icon: '🌡️', label: 'DB Throttle',      desc: 'Cosmos RU exhausted' },
  { icon: '💥', label: 'Pod Crash',        desc: 'rule-engine-pod-3xk7' },
  { icon: '📈', label: 'Auto-Scale',       desc: 'AKS: 3 → 9 replicas' },
]

export default function ChaosController() {
  const [open, setOpen] = useState(false)
  const {
    chaosMode, chaosIntensity, toggleChaosMode, setChaosIntensity,
    failureMode, toggleFailureMode, recoveryStage,
    addDebugLog,
  } = useSystemStore()

  const activeEvents = Math.floor((chaosIntensity / 100) * CASCADE_EVENTS.length)

  const handleIntensity = (v: number) => {
    setChaosIntensity(v)
    if (v > 0 && v % 20 < 5) {
      const ev = CASCADE_EVENTS[Math.floor(v / 20)]
      if (ev) addDebugLog('WARN', `[CHAOS] ${ev.label}: ${ev.desc}`)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed top-[72px] right-4 z-50 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
        style={{
          background: chaosMode ? 'rgba(220,38,38,0.2)' : 'rgba(99,102,241,0.15)',
          border: chaosMode ? '1px solid rgba(220,38,38,0.5)' : '1px solid rgba(99,102,241,0.3)',
          backdropFilter: 'blur(12px)',
        }}
        animate={chaosMode ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ repeat: chaosMode ? Infinity : 0, duration: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        title="Chaos Controller"
      >
        <Zap size={16} className={chaosMode ? 'text-red-400' : 'text-indigo-400'} />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-16 right-4 z-50 w-72 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(5,8,22,0.97)',
              border: '1px solid rgba(99,102,241,0.25)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
              <Zap size={14} className="text-indigo-400" />
              <span className="text-xs font-mono font-bold text-indigo-300 tracking-widest">CHAOS CONTROLLER</span>
              <button onClick={() => setOpen(false)} className="ml-auto text-gray-600 hover:text-gray-400 transition-colors">
                <X size={14} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Chaos mode toggle */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">Stress Test Mode</span>
                <motion.button
                  onClick={toggleChaosMode}
                  className="relative w-11 h-6 rounded-full transition-colors"
                  style={{ background: chaosMode ? 'rgba(220,38,38,0.5)' : 'rgba(99,102,241,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 rounded-full"
                    style={{ background: chaosMode ? '#ef4444' : '#6366f1' }}
                    animate={{ left: chaosMode ? '22px' : '2px' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                </motion.button>
              </div>

              {/* Intensity slider */}
              <AnimatePresence>
                {chaosMode && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-gray-500">Intensity</span>
                      <span className="text-xs font-mono font-bold"
                        style={{ color: chaosIntensity > 70 ? '#ef4444' : chaosIntensity > 40 ? '#f59e0b' : '#10b981' }}>
                        {chaosIntensity}%
                      </span>
                    </div>
                    <input
                      type="range" min={0} max={100} value={chaosIntensity}
                      onChange={(e) => handleIntensity(Number(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{ background: `linear-gradient(90deg, ${chaosIntensity > 70 ? '#ef4444' : chaosIntensity > 40 ? '#f59e0b' : '#6366f1'} ${chaosIntensity}%, rgba(255,255,255,0.1) ${chaosIntensity}%)` }}
                    />

                    {/* Cascade events */}
                    <div className="mt-3 space-y-1">
                      {CASCADE_EVENTS.map((ev, i) => (
                        <motion.div
                          key={ev.label}
                          className="flex items-center gap-2 text-xs font-mono py-1 px-2 rounded-lg"
                          animate={{
                            background: i < activeEvents ? 'rgba(220,38,38,0.1)' : 'transparent',
                            opacity: i < activeEvents ? 1 : 0.35,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <span>{ev.icon}</span>
                          <span style={{ color: i < activeEvents ? '#f87171' : '#6b7280' }}>{ev.label}</span>
                          <span className="ml-auto text-gray-600 text-[10px]">{i < activeEvents ? ev.desc : '—'}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* P1 Failure trigger */}
              <div className="pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <motion.button
                  onClick={toggleFailureMode}
                  className="w-full py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all"
                  style={failureMode
                    ? { background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }
                    : { background: 'rgba(220,38,38,0.15)', color: '#f87171', border: '1px solid rgba(220,38,38,0.3)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={recoveryStage === 'recovering'}
                >
                  {recoveryStage === 'recovering'
                    ? '⟳ Recovery in progress...'
                    : failureMode
                      ? '↩ Reset System'
                      : '💥 Simulate P1 Incident'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
