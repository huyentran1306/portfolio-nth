import { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/sections/Hero'
import { MetricsPanel } from '@/components/MetricsPanel'
import { CustomCursor } from '@/components/CustomCursor'
import { AIAssistant } from '@/components/AIAssistant'
import FailureOverlay from '@/components/FailureOverlay'
import { BootScreen } from '@/components/BootScreen'
import { ScrollProgress } from '@/components/ScrollProgress'
import DebugConsole from '@/components/DebugConsole'
import ChaosController from '@/components/ChaosController'
import { useSystemStore } from '@/store/system'
import { cn } from '@/lib/utils'

// Lazy-load heavy sections
const CareerTimeline     = lazy(() => import('@/sections/CareerTimeline').then(m => ({ default: m.CareerTimeline })))
const DecisionSimulator  = lazy(() => import('@/sections/DecisionSimulator').then(m => ({ default: m.DecisionSimulator })))
const ProjectDeepDive    = lazy(() => import('@/sections/ProjectDeepDive').then(m => ({ default: m.ProjectDeepDive })))
const ProblemSolutionLab = lazy(() => import('@/sections/ProblemSolutionLab').then(m => ({ default: m.ProblemSolutionLab })))
const AIAndLeadership    = lazy(() => import('@/sections/AIAndLeadership').then(m => ({ default: m.AIAndLeadership })))
const SkillTree          = lazy(() => import('@/sections/SkillTree').then(m => ({ default: m.SkillTree })))
const Contact            = lazy(() => import('@/sections/Contact').then(m => ({ default: m.Contact })))

function SectionSkeleton() {
  return (
    <div className="py-24 px-6 max-w-5xl mx-auto space-y-6">
      <div className="skeleton h-8 w-48 mx-auto" />
      <div className="skeleton h-12 w-3/4 mx-auto" />
      <div className="skeleton h-4 w-1/2 mx-auto" />
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[1,2,3].map(i => <div key={i} className="skeleton h-40 rounded-2xl" />)}
      </div>
    </div>
  )
}

function App() {
  const { failureMode } = useSystemStore()
  const [booted, setBooted] = useState(false)
  const handleBoot = useCallback(() => setBooted(true), [])

  // Live metric fluctuation (skip when chaos/failure is controlling metrics)
  useEffect(() => {
    const id = setInterval(() => {
      const s = useSystemStore.getState()
      if (s.chaosMode || s.failureMode || s.recoveryStage === 'recovering') return
      s.setMetrics({
        traffic: 2200 + Math.round(Math.random() * 500),
        latency: 130 + Math.round(Math.random() * 30),
      })
    }, 2000)
    return () => clearInterval(id)
  }, [])

  // system state reactive

  return (
    <>
      <BootScreen onDone={handleBoot} />

      <div className={cn(
        'min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-opacity duration-500',
        booted ? 'opacity-100' : 'opacity-0',
        failureMode && 'failure-mode'
      )}>
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <MetricsPanel />
        <FailureOverlay />
        <ChaosController />

        <main className="pb-28 md:pb-0">
          <Hero />

          <Suspense fallback={<SectionSkeleton />}>
            <CareerTimeline />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <DecisionSimulator />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <ProjectDeepDive />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <SkillTree />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <ProblemSolutionLab />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <AIAndLeadership />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <Contact />
          </Suspense>
        </main>

        <AIAssistant />
        <DebugConsole />
      </div>
    </>
  )
}

export default App
