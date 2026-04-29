import { create } from 'zustand'

export type SystemStatus = 'idle' | 'loading' | 'error' | 'optimized'

interface SystemState {
  traffic: number          // requests/sec
  latency: number          // ms
  cacheHitRate: number     // 0-100
  errorRate: number        // 0-100
  systemStatus: SystemStatus
  failureMode: boolean
  timelineYear: number     // 2016-2024
  activeStage: string | null  // for pipeline animation

  setMetrics: (m: Partial<Pick<SystemState, 'traffic' | 'latency' | 'cacheHitRate' | 'errorRate' | 'systemStatus'>>) => void
  toggleFailureMode: () => void
  setTimelineYear: (y: number) => void
  setActiveStage: (s: string | null) => void
  simulateNormal: () => void
  simulateFailure: () => void
  simulateOptimized: () => void
}

export const useSystemStore = create<SystemState>((set, get) => ({
  traffic: 2400,
  latency: 142,
  cacheHitRate: 87,
  errorRate: 0.3,
  systemStatus: 'optimized',
  failureMode: false,
  timelineYear: 2024,
  activeStage: null,

  setMetrics: (m) => set((s) => ({ ...s, ...m })),

  toggleFailureMode: () => {
    const next = !get().failureMode
    set({ failureMode: next })
    if (next) {
      get().simulateFailure()
    } else {
      get().simulateOptimized()
    }
  },

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

  simulateNormal: () =>
    set({
      traffic: 2400,
      latency: 142,
      cacheHitRate: 87,
      errorRate: 0.3,
      systemStatus: 'optimized',
    }),

  simulateFailure: () =>
    set({
      traffic: 8900,
      latency: 3200,
      cacheHitRate: 12,
      errorRate: 24.5,
      systemStatus: 'error',
    }),

  simulateOptimized: () =>
    set({
      traffic: 2400,
      latency: 142,
      cacheHitRate: 87,
      errorRate: 0.3,
      systemStatus: 'optimized',
    }),
}))
