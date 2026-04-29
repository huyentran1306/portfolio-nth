export interface DecisionOption {
  id: string
  label: string
  pros: string[]
  cons: string[]
  risks: string[]
}

export interface DecisionScenario {
  id: string
  title: string
  context: string
  question: string
  options: DecisionOption[]
  myChoice: string
  myReasoning: string
  finalDecision: string
}

export const decisionScenarios: DecisionScenario[] = [
  {
    id: 'caching-strategy',
    title: 'High-Traffic Reward System',
    context:
      'CapitaStar processes 500k+ daily reward queries. Marketing wants real-time balance display. The system must handle 10× spikes during campaigns.',
    question: 'How do you handle the read load on user reward balances?',
    options: [
      {
        id: 'cache-all',
        label: 'Cache everything aggressively',
        pros: [
          'Minimal DB load even at 10× spike',
          'Sub-10ms read latency',
          'Predictable cost (fewer Cosmos DB RUs)',
        ],
        cons: [
          'Stale data risk during high write frequency',
          'Cache invalidation complexity',
          'Memory pressure on Redis at scale',
        ],
        risks: ['Users see outdated balance after earning points', 'Cache stampede on cold start'],
      },
      {
        id: 'no-cache',
        label: 'Query Cosmos DB directly',
        pros: [
          'Always fresh data',
          'Simple architecture',
          'No cache invalidation logic',
        ],
        cons: [
          'High RU cost at scale',
          '503 errors during peak traffic',
          '200-400ms query latency',
        ],
        risks: ['RU exhaustion causes full outage', 'Unpredictable cost spikes'],
      },
      {
        id: 'tiered-cache',
        label: 'Tiered cache + event-driven invalidation',
        pros: [
          'Fresh data within 5s of mutation',
          '70% RU reduction',
          'Handles spikes gracefully',
        ],
        cons: [
          'More complex infrastructure',
          'Service Bus dependency',
          'Requires careful TTL tuning',
        ],
        risks: [
          'Event processing lag during Service Bus throttling',
          'Dual-write consistency requires idempotency',
        ],
      },
    ],
    myChoice: 'tiered-cache',
    myReasoning:
      'Direct DB query is a non-starter at our scale — we tested it and hit RU exhaustion at 3× normal load. Pure aggressive caching works but creates visible stale-data UX issues that loyalty users notice (their points are "missing"). The tiered approach gives us the best of both: Redis L1 (hot balance, 5min TTL) + in-memory L2 (30s) with event-driven invalidation on any mutation via Service Bus. We accept up to 5s stale window, which is acceptable per product agreement.',
    finalDecision:
      'Tiered cache (Redis + in-memory) with event-driven invalidation via Azure Service Bus. TTL chosen to match business SLA, not technical convenience.',
  },
  {
    id: 'rule-engine-arch',
    title: 'Rule Engine Architecture',
    context:
      'Marketing needs to configure 80+ campaign types with complex conditions (tier-based, time-limited, spend-threshold, category-specific). Rules change weekly.',
    question: 'Where does the rule evaluation logic live?',
    options: [
      {
        id: 'centralized',
        label: 'Centralized Rule Engine (shared service)',
        pros: [
          'Single source of truth for all rules',
          'Easy to audit and monitor',
          'Consistent evaluation across all callers',
        ],
        cons: [
          'Single point of failure',
          'Scaling requires scaling the whole engine',
          'Tight coupling if not well-designed',
        ],
        risks: ['Bottleneck during campaign launches', 'Version conflicts between callers'],
      },
      {
        id: 'distributed',
        label: 'Distributed (each microservice evaluates own rules)',
        pros: [
          'Independent scaling',
          'No cross-service dependency',
          'Faster for simple rules',
        ],
        cons: [
          'Rule duplication across services',
          'Inconsistent evaluation logic',
          'Nightmare to update a rule across 6 services',
        ],
        risks: ['Rule drift — services use different versions', 'Impossible to audit centrally'],
      },
      {
        id: 'engine-as-lib',
        label: 'Rule Engine as shared library + async evaluation',
        pros: [
          'No network hop for evaluation',
          'Rules stored centrally in Cosmos DB',
          'Each service loads rules on startup + refresh via event',
        ],
        cons: [
          'Library versioning required',
          'Rule refresh latency (~30s)',
          'Memory usage per instance',
        ],
        risks: ['Library version skew during rolling deploys', 'Rule refresh failure silently uses stale rules'],
      },
    ],
    myChoice: 'engine-as-lib',
    myReasoning:
      "A pure centralized service creates a synchronous bottleneck — during a flash sale, rule evaluation latency directly adds to the reward API's P99. Distributed logic is worse: I've seen rule drift cause a 3-day incident where two services disagreed on eligibility. The library approach keeps rules in Cosmos DB (authoritative), loads them into memory at startup, and refreshes via Service Bus events when marketing saves a rule change. Evaluation is in-process (no network hop). Rule updates propagate in <30s, which is acceptable.",
    finalDecision:
      'Rule Engine as a shared .NET NuGet library. Rules persisted in Cosmos DB. In-memory evaluation with Service Bus-triggered refresh. CMS is the only write path.',
  },
  {
    id: 'microservices-vs-monolith',
    title: 'Monolith vs Microservices for Loyalty Platform',
    context:
      'Starting a new loyalty platform. Team of 8 developers. Expected to grow to 20 in 18 months. CEO wants feature velocity now, CTO wants scalability.',
    question: 'What architecture do you start with?',
    options: [
      {
        id: 'full-micro',
        label: 'Full microservices from day one',
        pros: ['Independent scaling', 'Tech autonomy per team', 'Future-proof'],
        cons: [
          'Massive overhead for small team',
          'Distributed systems complexity early',
          'Slows initial feature velocity 2-3×',
        ],
        risks: ['Over-engineering kills the product before it finds market fit'],
      },
      {
        id: 'monolith',
        label: 'Modular monolith first',
        pros: [
          'Fast iteration',
          'Simple to debug and deploy',
          'Easier onboarding',
        ],
        cons: ['Hard to scale specific bottlenecks later', 'Discipline required to keep modules clean'],
        risks: ['Technical debt accumulates if module boundaries ignored'],
      },
      {
        id: 'strangler',
        label: 'Modular monolith with strangler fig migration path',
        pros: [
          'Velocity now, scalability later',
          'Module boundaries become service boundaries',
          'Incremental risk',
        ],
        cons: ['Requires strict modularity discipline from day one', 'Migration has dual maintenance window'],
        risks: ['Modules become tangled, migration becomes expensive'],
      },
    ],
    myChoice: 'strangler',
    myReasoning:
      "Full microservices on day one with 8 devs is how you spend 6 months building infrastructure instead of product. I've seen this kill projects. The key insight: a well-modularized monolith with clean bounded contexts can be extracted into services on demand. We enforced strict module interfaces from day one (no cross-module direct DB access), so when Rule Engine became the bottleneck at 200k users, we extracted it in 3 weeks — not 3 months.",
    finalDecision:
      'Modular monolith with explicit bounded contexts and clean interfaces. Microservice extraction triggered by measured performance or team-size constraints, not speculation.',
  },
]
