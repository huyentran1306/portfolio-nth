export const aiIntegrations = [
  {
    id: 'test-gen',
    icon: '🧪',
    title: 'AI Test Case Generation',
    problem: 'Manual test case writing for Rule Engine took 2–3 days per campaign type. Coverage was inconsistent.',
    solution:
      'Integrated GPT-4o via Azure OpenAI to generate test cases from Rule Engine specs. Input: rule definition JSON. Output: edge cases, boundary tests, negative scenarios.',
    impact: 'Test coverage increased from 40% → 85%. Test authoring time reduced 80%. QA team now reviews rather than writes.',
    tech: ['Azure OpenAI', 'GPT-4o', '.NET', 'xUnit'],
  },
  {
    id: 'knowledge-bot',
    icon: '💬',
    title: 'AI Knowledge Base Chatbot',
    problem:
      'New devs spent 2+ weeks asking questions about system architecture, APIs, and domain rules. Documentation was scattered and outdated.',
    solution:
      'Built RAG-based chatbot over Confluence + GitHub wikis using Azure AI Search + GPT-4. Slack-integrated. Answers include source citations.',
    impact: 'Onboarding time reduced from 2 weeks → 3 days. 70% of repeat questions now answered by bot.',
    tech: ['Azure AI Search', 'GPT-4', 'RAG', 'Slack API'],
  },
  {
    id: 'perf-monitor',
    icon: '📊',
    title: 'AI Performance Anomaly Detection',
    problem:
      'Latency spikes were caught reactively — by the time alerts fired, users were already impacted. Root cause analysis took hours.',
    solution:
      'Implemented ML-based anomaly detection on Application Insights telemetry. Models trained on 6 months of baseline data. Alerts fire 10 minutes before threshold breach.',
    impact: 'Mean time to detect (MTTD) reduced from 15min → 2min. Proactive escalation before user impact in 3 incidents.',
    tech: ['Azure ML', 'Application Insights', 'Python', 'Azure Monitor'],
  },
  {
    id: 'task-assign',
    icon: '📋',
    title: 'AI Task Assignment Optimization',
    problem:
      'Sprint planning was subjective. Senior devs were over-allocated; juniors were underutilized. Skill gaps went unnoticed.',
    solution:
      'Built a task scoring system using historical velocity data + developer skill profiles. LLM classifies task complexity, matches to developer capacity. Generates sprint plan with load balancing.',
    impact: 'Sprint predictability improved from 65% → 87%. 3 junior devs identified as ready for promotion earlier.',
    tech: ['Azure OpenAI', 'Azure DevOps API', 'Python', 'GPT-4'],
  },
]

export const leadershipData = [
  {
    icon: '🎯',
    title: 'How I Lead a Team',
    points: [
      'Context-first leadership: explain the WHY before the WHAT. Developers make better decisions when they understand the problem.',
      'Weekly 1:1s focused on blockers and growth, not status updates — Jira has status, 1:1s are for humans.',
      'I write the first version of every major design doc myself, then invite challenge. Opinions need skin in the game.',
      'On-call rotation includes me — leads shouldn\'t be exempt from the systems they build.',
    ],
  },
  {
    icon: '🌱',
    title: 'How I Mentor Developers',
    points: [
      'Pair on the first PR of any new domain. Not to review — to transfer context that isn\'t in the docs.',
      'Give feedback on design decisions, not just implementation. "This works" is not enough feedback.',
      'Assign stretch tasks with explicit safety nets. Juniors grow faster when the cost of failure is bounded.',
      'Code review comments are teaching moments, not corrections. Always explain the tradeoff.',
    ],
  },
  {
    icon: '🔥',
    title: 'Production Incident Playbook',
    points: [
      'First 5 minutes: stop the bleeding (rollback / feature flag off). Don\'t debug under fire.',
      'Assign roles: incident commander, comms lead, and investigator. No free-for-all debugging.',
      'Post-mortem within 48 hours. Blameless. Focus on system failure, not human error.',
      'Every incident produces at least one runbook update. If it happened once, it will happen again.',
    ],
  },
  {
    icon: '🤝',
    title: 'Cross-functional Collaboration',
    points: [
      'Product meetings: I come with data (latency numbers, error rates) — not just opinions.',
      'QA partnership: I write the test plan for complex rules before coding starts. No surprises.',
      'DevOps: Infrastructure as Code is a non-negotiable. Every resource I need, I define in Terraform.',
      'Design reviews with Product/UX for API contracts. Consumers should drive API design, not implementations.',
    ],
  },
]
