import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion'
import { useSystemStore } from '@/store/system'
import { cn } from '@/lib/utils'
import { Activity, Zap, Database, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const mv = useMotionValue(value)

  useEffect(() => {
    const ctrl = animate(mv, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toString() + suffix
      },
    })
    return ctrl.stop
  }, [value, mv, suffix])

  return <span ref={ref}>{Math.round(value)}{suffix}</span>
}

// Mini sparkline for latency history
function Sparkline({ values, color }: { values: number[]; color: string }) {
  if (values.length < 2) return null
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const w = 64, h = 20
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MetricsPanel() {
  const { traffic, latency, cacheHitRate, errorRate, systemStatus, failureMode, chaosMode, chaosIntensity } = useSystemStore()
  const [expanded, setExpanded] = useState(false)
  const [latencyHistory, setLatencyHistory] = useState<number[]>([142])

  // Track latency history
  useEffect(() => {
    setLatencyHistory((h) => [...h.slice(-19), latency])
  }, [latency])

  const statusColor = {
    idle: '#9ca3af',
    loading: '#f59e0b',
    error: '#ef4444',
    optimized: '#10b981',
  }[systemStatus]

  const statusDot = {
    idle: 'bg-gray-400',
    loading: 'bg-yellow-400 animate-pulse',
    error: 'bg-red-400 animate-pulse',
    optimized: 'bg-emerald-400',
  }[systemStatus]

  const latencyColor = latency > 1000 ? '#ef4444' : latency > 400 ? '#f59e0b' : '#10b981'
  const cacheColor = cacheHitRate < 40 ? '#ef4444' : cacheHitRate < 70 ? '#f59e0b' : '#10b981'
  const errorColor = errorRate > 5 ? '#ef4444' : errorRate > 1 ? '#f59e0b' : '#10b981'
  const trafficColor = traffic > 8000 ? '#ef4444' : traffic > 5000 ? '#f59e0b' : '#10b981'

  const panelBg = failureMode
    ? 'rgba(20,4,4,0.92)'
    : chaosMode && chaosIntensity > 60
      ? 'rgba(20,10,4,0.92)'
      : 'rgba(5,8,22,0.88)'

  const panelBorder = failureMode
    ? 'rgba(220,38,38,0.4)'
    : chaosMode
      ? `rgba(245,158,11,${0.15 + (chaosIntensity / 100) * 0.35})`
      : 'rgba(99,102,241,0.2)'

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-20 right-4 z-40 w-56 rounded-2xl text-xs backdrop-blur-xl hidden sm:block overflow-hidden"
      style={{ background: panelBg, border: `1px solid ${panelBorder}` }}
    >
      {/* Chaos/failure intensity bar */}
      {(chaosMode || failureMode) && (
        <motion.div
          className="h-0.5"
          style={{
            background: failureMode
              ? '#ef4444'
              : `linear-gradient(90deg, #f59e0b, #ef4444)`,
            width: failureMode ? '100%' : `${chaosIntensity}%`,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
      )}

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className={cn('w-2 h-2 rounded-full', statusDot)}
              animate={systemStatus === 'error' ? { scale: [1, 1.5, 1] } : {}}
              transition={{ repeat: Infinity, duration: 0.6 }}
            />
            <span className="font-semibold uppercase tracking-wider text-[10px]" style={{ color: statusColor }}>
              {systemStatus}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-mono text-[10px]">LIVE</span>
            <button onClick={() => setExpanded(v => !v)} className="text-gray-600 hover:text-gray-400 transition-colors">
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>
        </div>

        {/* Main metrics */}
        <div className="space-y-2">
          <MetricRow icon={<Activity size={11} />} label="Req/sec"
            value={<AnimatedNumber value={traffic} />}
            color={trafficColor} />

          <div>
            <MetricRow icon={<Zap size={11} />} label="Latency"
              value={<AnimatedNumber value={latency} suffix="ms" />}
              color={latencyColor} />
            {latency > 400 && (
              <motion.p className="text-[9px] font-mono mt-0.5 ml-4" style={{ color: latencyColor }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                ⚠ High latency
              </motion.p>
            )}
          </div>

          <MetricRow icon={<Database size={11} />} label="Cache Hit"
            value={<AnimatedNumber value={cacheHitRate} suffix="%" />}
            color={cacheColor} />

          <MetricRow icon={<AlertTriangle size={11} />} label="Error Rate"
            value={<span>{errorRate.toFixed(1)}%</span>}
            color={errorColor} />
        </div>

        {/* Expanded: sparkline */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-gray-500 font-mono">Latency trend</span>
                  <span className="text-[10px] font-mono" style={{ color: latencyColor }}>{latency}ms</span>
                </div>
                <Sparkline values={latencyHistory} color={latencyColor} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function MetricRow({ icon, label, value, color }: {
  icon: React.ReactNode; label: string; value: React.ReactNode; color: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5" style={{ color }}>
        {icon}
        <span className="text-gray-400">{label}</span>
      </div>
      <span className="font-mono font-semibold" style={{ color }}>{value}</span>
    </div>
  )
}
