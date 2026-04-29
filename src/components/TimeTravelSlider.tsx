import { motion } from 'framer-motion'
import { useSystemStore } from '@/store/system'

const YEAR_EVENTS: Record<number, { label: string; desc: string }> = {
  2016: { label: 'Junior Dev', desc: 'CRUD APIs, SQL Server, learning Clean Architecture' },
  2018: { label: 'Mid Developer', desc: 'DDD, CQRS, first performance optimization (80% query time reduction)' },
  2019: { label: 'Senior Dev', desc: 'CMS Portal with event sourcing + RBAC. Zero data loss post-launch.' },
  2021: { label: 'Performance Focus', desc: 'Multi-layer Redis caching. Cosmos DB RU -70%. SLA 99.95%.' },
  2022: { label: 'Rule Engine Architect', desc: 'Dynamic rule engine. 2 weeks → 30min rule deployment time.' },
  2024: { label: 'Tech Lead', desc: 'Microservices on AKS. P99 3.2s → 1.1s. 4× deployment frequency.' },
}

const YEARS = [2016, 2018, 2019, 2021, 2022, 2024]

export function TimeTravelSlider() {
  const { timelineYear, setTimelineYear, latency, cacheHitRate, traffic } = useSystemStore()

  const event = YEAR_EVENTS[timelineYear] ?? YEAR_EVENTS[2024]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mt-16 max-w-2xl mx-auto"
    >
      <div className="text-center mb-6">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
          Time Travel Mode
        </p>
        <p className="text-sm text-[var(--fg-secondary)]">
          Drag to explore how the system evolved from 2016 → 2024
        </p>
      </div>

      <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 space-y-5">
        {/* Year display */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-[var(--fg)]">{timelineYear}</div>
            <div className="text-sm font-medium text-[var(--accent)]">{event.label}</div>
            <div className="text-xs text-[var(--fg-secondary)] mt-1 max-w-xs">{event.desc}</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-[var(--fg)]">{latency}ms</div>
              <div className="text-[10px] text-[var(--fg-tertiary)] uppercase">Latency</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--fg)]">{cacheHitRate}%</div>
              <div className="text-[10px] text-[var(--fg-tertiary)] uppercase">Cache</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--fg)]">{traffic.toLocaleString()}</div>
              <div className="text-[10px] text-[var(--fg-tertiary)] uppercase">Req/s</div>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div>
          <input
            type="range"
            min={2016}
            max={2024}
            step={1}
            value={timelineYear}
            onChange={(e) => setTimelineYear(Number(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setTimelineYear(y)}
                className="text-[10px] text-[var(--fg-tertiary)] hover:text-[var(--accent)] transition-colors"
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar: latency */}
        <div>
          <div className="flex justify-between text-[11px] text-[var(--fg-tertiary)] mb-1">
            <span>Latency</span>
            <span>{latency}ms</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--border)]">
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              animate={{ width: `${Math.max(5, 100 - ((latency - 120) / 680) * 100)}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
