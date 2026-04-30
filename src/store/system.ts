import { create } from 'zustand'

export type SystemStatus = 'idle' | 'loading' | 'error' | 'optimized'
export type RecoveryStage = 'normal' | 'degrading' | 'collapsed' | 'recovering' | 'recovered'

export interface DebugLog {
  id: number
  time: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' | 'SUCCESS'
  message: string
}

export interface ChaosEvent {
  id: string
  name: string
  icon: string
  description: string
  effect: () => void
}

interface SystemState {
  // Core metrics
  traffic: number
  latency: number
  cacheHitRate: number
  errorRate: number
  systemStatus: SystemStatus

  // Failure
  failureMode: boolean
  recoveryStage: RecoveryStage

  // Chaos
  chaosMode: boolean
  chaosIntensity: number  // 0-100

  // Focus
  focusedModule: string | null

  // Debug console
  debugLogs: DebugLog[]
  debugLogCounter: number

  // Timeline
  timelineYear: number
  activeStage: string | null

  // Actions
  setMetrics: (m: Partial<Pick<SystemState, 'traffic' | 'latency' | 'cacheHitRate' | 'errorRate' | 'systemStatus'>>) => void
  toggleFailureMode: () => void
  startRecovery: () => void
  setRecoveryStage: (s: RecoveryStage) => void
  toggleChaosMode: () => void
  setChaosIntensity: (v: number) => void
  setFocusedModule: (m: string | null) => void
  addDebugLog: (level: DebugLog['level'], message: string) => void
  clearDebugLogs: () => void
  setTimelineYear: (y: number) => void
  setActiveStage: (s: string | null) => void
  simulateNormal: () => void
  simulateFailure: () => void
  simulateOptimized: () => void
}

let logId = 0
function makeLog(level: DebugLog['level'], message: string): DebugLog {
  const now = new Date()
  return {
    id: ++logId,
    time: `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}.${String(now.getMilliseconds()).padStart(3,'0')}`,
    level,
    message,
  }
}

export const useSystemStore = create<SystemState>((set, get) => ({
  traffic: 2400,
  latency: 142,
  cacheHitRate: 87,
  errorRate: 0.3,
  systemStatus: 'optimized',
  failureMode: false,
  recoveryStage: 'normal',
  chaosMode: false,
  chaosIntensity: 0,
  focusedModule: null,
  debugLogs: [
    makeLog('SUCCESS', 'Portfolio OS initialized'),
    makeLog('INFO', 'Rule Engine v3.2 — 80+ rules loaded'),
    makeLog('INFO', 'Azure AKS cluster: 3 replicas healthy'),
    makeLog('DEBUG', 'Metrics stream connected'),
  ],
  debugLogCounter: 0,
  timelineYear: 2024,
  activeStage: null,

  setMetrics: (m) => set((s) => ({ ...s, ...m })),

  toggleFailureMode: () => {
    const next = !get().failureMode
    set({ failureMode: next })
    if (next) {
      get().simulateFailure()
      set({ recoveryStage: 'collapsed' })
      get().addDebugLog('ERROR', 'INCIDENT P1: System failure detected')
      get().addDebugLog('ERROR', 'Service Bus queue depth: 9,842 (threshold: 1000)')
      get().addDebugLog('WARN', 'Cache hit rate dropped to 12% — serving stale data')
    } else {
      get().startRecovery()
    }
  },

  startRecovery: () => {
    set({ recoveryStage: 'recovering' })
    get().addDebugLog('INFO', 'Initiating incident recovery procedure...')
    get().addDebugLog('INFO', 'Draining Service Bus queue...')

    setTimeout(() => {
      set({ latency: 800, traffic: 5000, cacheHitRate: 40, errorRate: 8 })
      get().addDebugLog('INFO', 'Pods restarting — health checks passing')
    }, 1200)

    setTimeout(() => {
      set({ latency: 400, cacheHitRate: 65, errorRate: 2, systemStatus: 'loading' })
      get().addDebugLog('INFO', 'Cache warming up... hit rate recovering')
    }, 2400)

    setTimeout(() => {
      get().simulateOptimized()
      set({ failureMode: false, recoveryStage: 'recovered' })
      get().addDebugLog('SUCCESS', 'System recovered — all metrics nominal')
      setTimeout(() => set({ recoveryStage: 'normal' }), 3000)
    }, 4000)
  },

  setRecoveryStage: (s) => set({ recoveryStage: s }),

  toggleChaosMode: () => {
    const next = !get().chaosMode
    set({ chaosMode: next, chaosIntensity: next ? 0 : 0 })
    if (next) {
      get().addDebugLog('WARN', 'CHAOS MODE ACTIVATED — stress testing in progress')
    } else {
      get().simulateOptimized()
      set({ chaosIntensity: 0 })
      get().addDebugLog('INFO', 'Chaos mode deactivated — system restored')
    }
  },

  setChaosIntensity: (v) => {
    set({ chaosIntensity: v })
    const t = Math.round(2400 + (v / 100) * 8000)
    const l = Math.round(142 + (v / 100) * 3000)
    const c = Math.round(87 - (v / 100) * 75)
    const e = Math.round((0.3 + (v / 100) * 24) * 10) / 10
    const status: SystemStatus = v > 80 ? 'error' : v > 40 ? 'loading' : 'optimized'
    set({ traffic: t, latency: l, cacheHitRate: Math.max(c, 5), errorRate: e, systemStatus: status })
  },

  setFocusedModule: (m) => set({ focusedModule: m }),

  addDebugLog: (level, message) => {
    const log = makeLog(level, message)
    set((s) => ({
      debugLogs: [log, ...s.debugLogs].slice(0, 50),
      debugLogCounter: s.debugLogCounter + 1,
    }))
  },

  clearDebugLogs: () => set({ debugLogs: [] }),

  setTimelineYear: (y) => {
    const progress = (y - 2016) / (2024 - 2016)
    set({
      timelineYear: y,
      traffic: Math.round(200 + progress * 2600),
      latency: Math.round(800 - progress * 680),
      cacheHitRate: Math.round(10 + progress * 80),
      errorRate: Math.round((5 - progress * 4.5) * 10) / 10,
      systemStatus: progress > 0.8 ? 'optimized' : progress > 0.4 ? 'loading' : 'idle',
    })
  },

  setActiveStage: (s) => set({ activeStage: s }),

  simulateNormal: () => set({ traffic: 2400, latency: 142, cacheHitRate: 87, errorRate: 0.3, systemStatus: 'optimized' }),
  simulateFailure: () => set({ traffic: 8900, latency: 3200, cacheHitRate: 12, errorRate: 24.5, systemStatus: 'error' }),
  simulateOptimized: () => set({ traffic: 2400, latency: 142, cacheHitRate: 87, errorRate: 0.3, systemStatus: 'optimized' }),
}))
