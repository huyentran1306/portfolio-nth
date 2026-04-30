import { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { useSystemStore } from '@/store/system'
import { cn } from '@/lib/utils'
import { Activity, Zap, Database, AlertTriangle } from 'lucide-react'

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

export function MetricsPanel() {
  const { traffic, latency, cacheHitRate, errorRate, systemStatus, failureMode, toggleFailureMode } =
    useSystemStore()

  const statusColor = {
    idle: 'text-gray-400',
    loading: 'text-yellow-400',
    error: 'text-red-400',
    optimized: 'text-emerald-400',
  }[systemStatus]

  const statusDot = {
    idle: 'bg-gray-400',
    loading: 'bg-yellow-400 animate-pulse',
    error: 'bg-red-400 animate-pulse',
    optimized: 'bg-emerald-400',
  }[systemStatus]

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className={cn(
        'fixed top-20 right-4 z-40 w-56 rounded-2xl border p-4 space-y-3 text-xs backdrop-blur-xl hidden sm:block',
        failureMode
          ? 'bg-red-950/80 border-red-500/40'
          : 'bg-[var(--card)]/80 border-[var(--card-border)]'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('w-2 h-2 rounded-full', statusDot)} />
          <span className={cn('font-semibold uppercase tracking-wider text-[10px]', statusColor)}>
            {systemStatus}
          </span>
        </div>
        <span className="text-[var(--fg-tertiary)] font-mono text-[10px]">LIVE</span>
      </div>

      {/* Metrics */}
      <div className="space-y-2">
        <MetricRow
          icon={<Activity size={11} />}
          label="Requests/sec"
          value={<AnimatedNumber value={traffic} />}
          alert={failureMode}
        />
        <MetricRow
          icon={<Zap size={11} />}
          label="Latency"
          value={<AnimatedNumber value={latency} suffix="ms" />}
          alert={latency > 500}
        />
        <MetricRow
          icon={<Database size={11} />}
          label="Cache Hit"
          value={<AnimatedNumber value={cacheHitRate} suffix="%" />}
          alert={cacheHitRate < 50}
        />
        <MetricRow
          icon={<AlertTriangle size={11} />}
          label="Error Rate"
          value={<span>{errorRate}%</span>}
          alert={errorRate > 1}
        />
      </div>

      {/* Failure toggle */}
      <button
        onClick={toggleFailureMode}
        className={cn(
          'w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all',
          failureMode
            ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
            : 'bg-[var(--bg-secondary)] text-[var(--fg-tertiary)] border border-[var(--border)] hover:border-red-400/50 hover:text-red-400'
        )}
      >
        {failureMode ? '⚠ Failure Mode ON' : 'Simulate Failure'}
      </button>
    </motion.div>
  )
}

function MetricRow({
  icon,
  label,
  value,
  alert,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  alert?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <div className={cn('flex items-center gap-1.5', alert ? 'text-red-400' : 'text-[var(--fg-tertiary)]')}>
        {icon}
        <span>{label}</span>
      </div>
      <span className={cn('font-mono font-semibold', alert ? 'text-red-400' : 'text-[var(--fg)]')}>
        {value}
      </span>
    </div>
  )
}
