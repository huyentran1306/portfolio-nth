import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/sections/Hero'
import { CareerTimeline } from '@/sections/CareerTimeline'
import { DecisionSimulator } from '@/sections/DecisionSimulator'
import { ProjectDeepDive } from '@/sections/ProjectDeepDive'
import { ProblemSolutionLab } from '@/sections/ProblemSolutionLab'
import { AIAndLeadership } from '@/sections/AIAndLeadership'
import { Contact } from '@/sections/Contact'
import { MetricsPanel } from '@/components/MetricsPanel'
import { CustomCursor } from '@/components/CustomCursor'
import { AIAssistant } from '@/components/AIAssistant'
import { FailureOverlay } from '@/components/FailureOverlay'
import { useSystemStore } from '@/store/system'
import { cn } from '@/lib/utils'

function App() {
  const { failureMode } = useSystemStore()

  // Periodically randomize traffic to make the metrics panel feel alive
  useEffect(() => {
    const id = setInterval(() => {
      useSystemStore.getState().setMetrics({
        traffic: useSystemStore.getState().failureMode
          ? 7000 + Math.round(Math.random() * 3000)
          : 2200 + Math.round(Math.random() * 500),
        latency: useSystemStore.getState().failureMode
          ? 2800 + Math.round(Math.random() * 800)
          : 130 + Math.round(Math.random() * 30),
      })
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={cn('min-h-screen bg-[var(--bg)] text-[var(--fg)]', failureMode && 'failure-mode')}>
      <CustomCursor />
      <Navbar />
      <MetricsPanel />
      <FailureOverlay />

      <main>
        <Hero />
        <CareerTimeline />
        <DecisionSimulator />
        <ProjectDeepDive />
        <ProblemSolutionLab />
        <AIAndLeadership />
        <Contact />
      </main>

      <AIAssistant />
    </div>
  )
}

export default App
