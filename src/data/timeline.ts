export interface TimelineItem {
  year: string
  role: string
  company: string
  project: string
  problem: string
  decision: string
  impact: string
  tags: string[]
}

export const timelineData: TimelineItem[] = [
  {
    year: '2024 – Present',
    role: 'Tech Lead',
    company: 'FPT Software',
    project: 'CapitaStar Loyalty Platform – Microservices Migration',
    problem:
      'Monolithic reward processing caused deployment bottlenecks and made it impossible to scale individual components under peak load (e.g., flash sales with 10× normal traffic).',
    decision:
      'Led the architectural shift to microservices on Azure AKS. Decomposed the monolith into 6 bounded-context services. Introduced Azure Service Bus for async reward processing and Redis for hot-data caching.',
    impact:
      'Deployment frequency increased 4×. System handled 10× peak load without degradation. P99 latency dropped from 3.2s → 1.1s.',
    tags: ['AKS', 'Microservices', 'Service Bus', 'Redis', 'Architecture'],
  },
  {
    year: '2022 – 2024',
    role: 'Senior .NET Developer',
    company: 'FPT Software',
    project: 'Rule Engine – Campaign Reward System',
    problem:
      'Marketing team needed to define complex reward rules (spend X, earn Y, per tier, per campaign) without engineering involvement. The existing hard-coded logic was unmaintainable and required a 2-week deploy cycle per rule change.',
    decision:
      'Designed a dynamic Rule Engine using the Strategy + Chain of Responsibility pattern, persisted in Cosmos DB. Rules are evaluated at runtime; marketing team configures via CMS. Introduced priority-based conflict resolution.',
    impact:
      'Rule deployment time: 2 weeks → 30 minutes (self-service). Rule coverage increased from 12 to 80+ campaign types without code change.',
    tags: ['Rule Engine', 'Cosmos DB', 'Design Patterns', 'CMS', '.NET'],
  },
  {
    year: '2021 – 2022',
    role: 'Senior .NET Developer',
    company: 'FPT Software',
    project: 'CapitaStar – Performance Optimization',
    problem:
      'Reward balance queries hitting Cosmos DB directly on every page load. At 500k DAU, this created RU exhaustion and caused 503 errors during peak hours.',
    decision:
      'Implemented a multi-layer caching strategy: Redis L1 (hot user data, 5min TTL) + in-memory L2 (per-instance, 30s). Cache invalidation via Service Bus events on any balance mutation.',
    impact:
      'Cosmos DB RU consumption dropped 70%. System SLA improved from 99.5% → 99.95%. Eliminated peak-hour 503 errors.',
    tags: ['Redis', 'Caching', 'Performance', 'Cosmos DB', 'Service Bus'],
  },
  {
    year: '2019 – 2021',
    role: '.NET Developer',
    company: 'FPT Software',
    project: 'CMS Portal – Content Management System',
    problem:
      'Static CMS with no version control or audit trail. Accidental data overwrites caused production incidents. No role-based access granularity.',
    decision:
      'Implemented event-sourcing pattern for CMS mutations. All changes recorded as immutable events. Added RBAC with fine-grained permissions. Built a temporal query system to reconstruct state at any point in time.',
    impact:
      'Zero data loss incidents post-launch. Audit compliance achieved. Rollback time from hours → seconds.',
    tags: ['Event Sourcing', 'RBAC', 'CMS', '.NET', 'Azure SQL'],
  },
  {
    year: '2016 – 2019',
    role: 'Junior → Mid .NET Developer',
    company: 'Various',
    project: 'Early Career – Foundation Building',
    problem:
      'Learning enterprise patterns, DDD, and building production-grade APIs. Faced challenges with N+1 query problems and unmaintainable spaghetti code in legacy systems.',
    decision:
      'Self-invested in DDD, CQRS, Clean Architecture. Refactored legacy modules with proper separation of concerns. Built internal tooling to detect N+1 queries via EF query logging.',
    impact:
      'Grew from writing CRUD to designing domain models. First performance optimization reduced query time by 80%.',
    tags: ['DDD', 'CQRS', 'Clean Architecture', '.NET', 'SQL Server'],
  },
]
