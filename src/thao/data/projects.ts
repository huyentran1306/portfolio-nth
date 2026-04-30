export interface Project {
  id: string
  name: string
  period: string
  domain: string
  size: number
  role: string
  summary: string
  highlights: string[]
  technologies: string[]
  icon: string
  color: string
}

export const projects: Project[] = [
  {
    id: 'cls-cs',
    name: 'CLS.CS — CapitaStar Loyalty',
    period: 'Apr 2024 – Present',
    domain: 'Loyalty / Fintech',
    size: 35,
    role: 'Quality Assurance',
    summary: 'Testing web & mobile for CapitaStar loyalty platform. Managing configuration from portal to app ensuring data integrity across the full stack.',
    highlights: [
      'Analyzed & designed 200+ test cases from user stories',
      'Executed UI, Functional, Regression & Smoke testing across web + app',
      'Supported AMS team in reproducing production issues & hotfixes',
      'Coordinated production deployment verification activities',
      'Compiled comprehensive test summary reports for stakeholders',
    ],
    technologies: ['API', 'SQL', 'VM Log Analysis', 'Chrome DevTools', 'Jira', 'Azure'],
    icon: '⭐',
    color: '#0ea5e9',
  },
  {
    id: 'e2h',
    name: 'E2H — Healthcare Migration',
    period: 'Feb 2023 – Apr 2024',
    domain: 'Healthcare (Japan)',
    size: 10,
    role: 'Quality Assurance',
    summary: 'Website migration from existing Japanese healthcare system. Ensuring zero functional regression between old and new system after migration.',
    highlights: [
      'Deep-dived into Japanese healthcare business processes & requirements',
      'Designed regression suites to guarantee migration fidelity',
      'Implemented Cypress automation to boost test coverage & efficiency',
      'Compiled test summary reports communicating migration quality',
    ],
    technologies: ['Cypress', 'Chrome', 'SQL Server', 'Postman'],
    icon: '🏥',
    color: '#06b6d4',
  },
  {
    id: 'sdc',
    name: 'SDC — Healthcare Platform',
    period: 'Sep 2022 – Feb 2023',
    domain: 'Healthcare (Japan)',
    size: 10,
    role: 'Quality Assurance',
    summary: 'Testing healthcare system migration for Japanese customer — validating that all functionality migrated correctly without regression.',
    highlights: [
      'Authored structured test cases for complex healthcare workflows',
      'Ran both manual & automated (Cypress) testing tracks in parallel',
      'Executed UI, Functional, Regression & Smoke testing',
      'Tracked defects end-to-end and confirmed quality on resolution',
    ],
    technologies: ['Cypress', 'Chrome', 'SQL Server'],
    icon: '💊',
    color: '#0284c7',
  },
  {
    id: 'c99-actuos',
    name: 'C99 Actuos — Car Auction',
    period: 'Jan 2022 – Sep 2022',
    domain: 'Automotive / E-Commerce',
    size: 15,
    role: 'Quality Assurance',
    summary: 'Testing used car auction website. Tools and automation to simulate vehicle lifecycle from listing to dealer sale.',
    highlights: [
      'Gained in-depth knowledge of automotive auction business logic',
      'Developed test cases from user stories ensuring full coverage',
      'Executed UI validation, functional verification & regression testing',
      'Used Postman + SQL Server to validate API and data integrity',
    ],
    technologies: ['Postman', 'SQL Server', 'Chrome', 'Microsoft Edge'],
    icon: '🚗',
    color: '#0369a1',
  },
  {
    id: 'adm',
    name: 'ADM — Agile Delivery Tool',
    period: 'Jan 2021 – Dec 2021',
    domain: 'Internal Tooling',
    size: 7,
    role: 'Quality Assurance',
    summary: 'Testing web application for tracking daily work reports of team members, visualizing Rally data in tables, charts & cards.',
    highlights: [
      'Aligned test strategy with Agile delivery business needs',
      'Designed test cases from user stories for comprehensive coverage',
      'Executed UI, Functional, Regression & Smoke testing',
      'Prepared stakeholder test summary reports',
    ],
    technologies: ['SQL Server', 'Postman', 'Chrome'],
    icon: '📊',
    color: '#0c4a6e',
  },
]
