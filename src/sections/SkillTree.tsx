import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper, SectionHeader } from '@/components/SectionWrapper'

interface SkillNode {
  id: string
  label: string
  sublabel: string
  icon: string
  x: number  // % grid
  y: number
  color: string
  glow: string
  deps?: string[]
  detail: string
  years: number
  level: 'core' | 'advanced' | 'expert'
}

const NODES: SkillNode[] = [
  { id: 'dotnet',      label: '.NET Core',      sublabel: 'C# / ASP.NET',  icon: '⬡', x: 50, y: 8,  color: '#818cf8', glow: 'rgba(129,140,248,0.5)', level: 'expert',   years: 8, detail: '8 years — microservices, DI, EF Core, SignalR, background workers', deps: [] },
  { id: 'microsvcs',  label: 'Microservices',  sublabel: 'DDD / CQRS',    icon: '⬡', x: 25, y: 26, color: '#a78bfa', glow: 'rgba(167,139,250,0.5)', level: 'expert',   years: 5, detail: 'Domain-driven design, CQRS/ES, Saga orchestration, API gateway', deps: ['dotnet'] },
  { id: 'azure',      label: 'Azure Cloud',    sublabel: 'AKS / Functions',icon: '⬡', x: 75, y: 26, color: '#60a5fa', glow: 'rgba(96,165,250,0.5)',  level: 'expert',   years: 5, detail: 'AKS, Service Bus, Cosmos DB, Functions, App Insights, ARM templates', deps: ['dotnet'] },
  { id: 'ruleengine', label: 'Rule Engine',    sublabel: '80+ Rules',     icon: '⬡', x: 15, y: 46, color: '#f59e0b', glow: 'rgba(245,158,11,0.5)',  level: 'expert',   years: 4, detail: 'Custom rule evaluation engine handling 80+ loyalty rules, 10M+ txns/day', deps: ['microsvcs'] },
  { id: 'redis',      label: 'Redis / Cache',  sublabel: 'Distributed',   icon: '⬡', x: 40, y: 46, color: '#f87171', glow: 'rgba(248,113,113,0.5)', level: 'advanced', years: 5, detail: 'Distributed caching, pub/sub, cache invalidation patterns, 87% hit rate', deps: ['microsvcs', 'azure'] },
  { id: 'cosmos',     label: 'Cosmos DB',      sublabel: 'NoSQL / Scale',  icon: '⬡', x: 62, y: 46, color: '#34d399', glow: 'rgba(52,211,153,0.5)',  level: 'advanced', years: 4, detail: 'Partition design, RU optimization, consistency levels, change feed patterns', deps: ['azure'] },
  { id: 'aks',        label: 'AKS / K8s',      sublabel: 'Orchestration',  icon: '⬡', x: 83, y: 46, color: '#22d3ee', glow: 'rgba(34,211,238,0.5)',  level: 'advanced', years: 3, detail: 'AKS cluster management, HPA, rolling deployments, pod disruption budgets', deps: ['azure'] },
  { id: 'ai',         label: 'AI / ML',        sublabel: 'Azure OpenAI',   icon: '⬡', x: 30, y: 68, color: '#e879f9', glow: 'rgba(232,121,249,0.5)', level: 'advanced', years: 2, detail: 'Azure OpenAI integration, Semantic Kernel, AI-assisted rule generation, LLM workflows', deps: ['ruleengine', 'redis'] },
  { id: 'lead',       label: 'Tech Lead',      sublabel: '6-member team',  icon: '⬡', x: 68, y: 68, color: '#fb923c', glow: 'rgba(251,146,60,0.5)',  level: 'expert',   years: 3, detail: 'Leading 6-member team, code reviews, ADRs, mentoring junior devs, sprint planning', deps: ['aks', 'cosmos'] },
]

const LEVEL_BADGE = {
  expert:   { label: 'Expert',   bg: 'bg-indigo-500/20 text-indigo-300' },
  advanced: { label: 'Advanced', bg: 'bg-emerald-500/20 text-emerald-300' },
  core:     { label: 'Core',     bg: 'bg-gray-500/20 text-gray-300' },
}

// SVG connections
function Connections({ hoveredId }: { hoveredId: string | null }) {
  const connections: Array<{ from: SkillNode; to: SkillNode }> = []
  NODES.forEach((n) => {
    n.deps?.forEach((depId) => {
      const dep = NODES.find((d) => d.id === depId)
      if (dep) connections.push({ from: dep, to: n })
    })
  })

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {connections.map(({ from, to }, i) => {
        const active = hoveredId === from.id || hoveredId === to.id
        return (
          <motion.line
            key={i}
            x1={`${from.x}%`} y1={`${from.y + 4}%`}
            x2={`${to.x}%`}   y2={`${to.y - 4}%`}
            strokeWidth={active ? 2 : 1}
            stroke={active ? from.color : 'rgba(255,255,255,0.08)'}
            strokeDasharray={active ? '0' : '4 4'}
            animate={{ opacity: active ? 0.9 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
        )
      })}
    </svg>
  )
}

export function SkillTree() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  // no system store needed

  const selected = NODES.find((n) => n.id === selectedId)
  const badge = selected ? LEVEL_BADGE[selected.level] : null

  return (
    <SectionWrapper id="skills">
      <SectionHeader
        pill="🌳 Skill Tree"
        title="Technology Graph"
        subtitle="8 years of compounding expertise — hover to explore connections"
      />

      {/* Tree graph */}
      <div className="relative w-full mx-auto" style={{ height: '440px', maxWidth: '720px' }}>
        <Connections hoveredId={hoveredId} />

        {NODES.map((node, i) => {
          const isHovered = hoveredId === node.id
          const isSelected = selectedId === node.id
          const isConnected = node.deps?.includes(hoveredId ?? '') || NODES.find(n => n.id === hoveredId)?.deps?.includes(node.id)

          return (
            <motion.div
              key={node.id}
              className="absolute flex flex-col items-center cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered || isSelected ? 20 : 10,
              }}
              onHoverStart={() => setHoveredId(node.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => setSelectedId(selectedId === node.id ? null : node.id)}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 18 }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: 56, height: 56,
                  background: `radial-gradient(circle, ${node.glow} 0%, transparent 70%)`,
                  top: -8, left: -8,
                }}
                animate={{ scale: isHovered ? [1, 1.3, 1] : 1, opacity: isHovered ? 1 : 0.4 }}
                transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
              />

              {/* Node hex */}
              <motion.div
                className="relative w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold"
                style={{
                  background: `rgba(${hexToRgb(node.color)}, 0.15)`,
                  border: `2px solid ${isSelected || isHovered ? node.color : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isHovered ? `0 0 20px ${node.glow}` : 'none',
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{ borderColor: isSelected ? node.color : undefined }}
              >
                {node.icon}
              </motion.div>

              {/* Label */}
              <motion.div
                className="mt-1.5 text-center"
                animate={{ opacity: isConnected || isHovered || !hoveredId ? 1 : 0.3 }}
              >
                <div className="text-[11px] font-semibold text-white leading-tight">{node.label}</div>
                <div className="text-[9px] text-gray-500">{node.sublabel}</div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="mx-auto mt-6 max-w-lg rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${selected.color}30`,
              boxShadow: `0 0 30px ${selected.glow}30`,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{selected.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">{selected.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${badge?.bg}`}>
                    {badge?.label}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">{selected.years}yr exp</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{selected.detail}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}
