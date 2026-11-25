export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  highlights: string[];
  stack: string[];
  accent: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: string;
  location: string;
  overview: string;
  achievements: string[];
  tags: string[];
}

export interface HonorItem {
  title: string;
  org: string;
  year: string;
  detail: string;
}

export interface StickerItem {
  id: string;
  label: string;
  sub: string;
  bg: string;
  fg: string;
  rotate: number;
  x: number;
  y: number;
}

export const PROFILE = {
  name: 'Faraaz Khan',
  handle: '@fvrvz',
  monogram: 'FK',
  role: 'Senior Full-Stack & UI/UX Systems Architect',
  tagline: 'I engineer tactile interfaces & resilient distributed systems.',
  email: 'codefaraaz@gmail.com',
  github: 'https://github.com/fvrvz',
  linkedin: 'https://linkedin.com/in/faraazkhhan',
  twitter: 'https://twitter.com/FaraazKhhan',
  yearsExp: '05+',
  systemsBuilt: '08+',
  mfeReduction: '80–90%',
  portraits: [
    { src: '/images/me_in_frame.jpg', caption: 'FRAME_01 // STUDIO' },
    { src: '/images/me.jpg', caption: 'FRAME_02 // PORTRAIT' },
    { src: '/images/me_thinking.jpg', caption: 'FRAME_03 // IDEATION' },
  ],
  manifesto:
    'With nearly 5 years across enterprise cloud platforms and boutique frontend craft, I bridge low-latency backend architecture in Go and Scala with fluid, 120fps micro-interactions in Svelte, React, and WebGL.',
};

export const STICKERS: StickerItem[] = [
  { id: 's1', label: 'SVELTE 5', sub: 'RUNES & MFE', bg: '#FF3B1D', fg: '#F4F3EE', rotate: -7, x: 4, y: 12 },
  { id: 's2', label: 'GO 1.24', sub: 'OIDC / CONCURRENCY', bg: '#CCFF00', fg: '#0D0D10', rotate: 5, x: 24, y: 8 },
  { id: 's3', label: 'SCALA 3.5', sub: 'TAPIR + HTTP4S', bg: '#0D0D10', fg: '#F4F3EE', rotate: -3, x: 46, y: 16 },
  { id: 's4', label: 'GSAP + LENIS', sub: 'SCROLL CHOREO', bg: '#CCFF00', fg: '#0D0D10', rotate: 8, x: 68, y: 10 },
  { id: 's5', label: 'REACT 19', sub: 'MICRO-FRONTENDS', bg: '#F4F3EE', fg: '#0D0D10', rotate: -6, x: 14, y: 54 },
  { id: 's6', label: 'THREE.JS', sub: 'WEBGL SHADERS', bg: '#FF3B1D', fg: '#F4F3EE', rotate: 4, x: 38, y: 58 },
  { id: 's7', label: 'ANGULAR 18+', sub: 'SIGNALS & NGRX', bg: '#0D0D10', fg: '#CCFF00', rotate: -5, x: 60, y: 52 },
  { id: 's8', label: 'PGVECTOR RAG', sub: 'AGENTIC AI', bg: '#CCFF00', fg: '#0D0D10', rotate: 6, x: 78, y: 46 },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'authforest',
    num: '01',
    title: 'AuthForest',
    category: 'Identity & Security Monorepo',
    year: '2025',
    summary:
      'RFC-compliant OpenID Connect & OAuth2 identity provider pairing a high-throughput Go 1.24 auth core with a reactive SvelteKit 2 control plane.',
    highlights: [
      'Full OIDC & OAuth2 discovery, PKCE & token introspection',
      'Clean Go domain isolation backed by PostgreSQL 17',
      'Live interactive developer dashboard in SvelteKit 2',
    ],
    stack: ['Go 1.24', 'SvelteKit 2', 'PostgreSQL 17', 'OIDC / OAuth2', 'Docker'],
    accent: '#CCFF00',
    githubUrl: 'https://github.com/fvrvz/authforest',
    liveUrl: 'https://authforest.byfaraaz.com/',
  },
  {
    id: 'billease',
    num: '02',
    title: 'Billease',
    category: 'Retail OS & GST Engine',
    year: '2025',
    summary:
      'High-speed retail billing, inventory, and Khata credit ledger engineered for Indian kirana stores and supermarkets.',
    highlights: [
      'Automated intra/inter-state GST tax split engine',
      'Functional Scala 3.5 backend with Tapir, Http4s & Cats Effect',
      'Ultra-reactive SolidJS POS UI secured via AuthForest OIDC',
    ],
    stack: ['Scala 3.5', 'SolidJS', 'Tapir + Http4s', 'Cats Effect', 'Tailwind'],
    accent: '#FF3B1D',
    githubUrl: 'https://github.com/fvrvz/billease',
    liveUrl: 'https://billease.byfaraaz.com/',
  },
  {
    id: 'managease',
    num: '03',
    title: 'ManagEase',
    category: 'Agile Workflow Platform',
    year: '2024',
    summary:
      'Kanban and sprint orchestration platform featuring drag-and-drop boards, Excel sprint plan ingestion, and real-time team telemetry.',
    highlights: [
      'SolidJS + TypeScript reactive board interactions',
      'Ruby on Rails 8 API with Devise & JWT authentication',
      'Schema-validated Excel sprint importer & Docker orchestration',
    ],
    stack: ['SolidJS', 'Ruby on Rails 8', 'PostgreSQL 16', 'TypeScript', 'Docker'],
    accent: '#CCFF00',
    githubUrl: 'https://github.com/fvrvz/managease',
    liveUrl: 'https://managease.byfaraaz.com/',
  },
  {
    id: 'notease',
    num: '04',
    title: 'NoteEase',
    category: 'Cross-Platform Spatial Notes',
    year: '2024',
    summary:
      'Minimalist multi-device notes app with signature vertical accordion strip motion and multi-provider cloud sync.',
    highlights: [
      'Custom accordion vertical strip expand/collapse choreography',
      'Sync across Google Drive, OneDrive, Dropbox & iCloud',
      'Single Flutter codebase for macOS, Windows, iOS, Android & Web',
    ],
    stack: ['Flutter', 'Dart', 'Multi-Cloud Sync', 'Glassmorphism'],
    accent: '#FF3B1D',
    githubUrl: 'https://github.com/fvrvz/notease',
    liveUrl: 'https://notease.byfaraaz.com/',
  },
  {
    id: 'nostyle',
    num: '05',
    title: 'NoStyleCSS',
    category: 'Open-Source Design Engine',
    year: '2024',
    summary:
      'Sub-12KB gzipped CSS utility framework and design-token system engineered from scratch with interactive Vue 3 docs.',
    highlights: [
      'Zero-bloat sub-12KB gzipped production footprint',
      'Micro-animation primitives & dark-first token scale',
      'Interactive live documentation playground in Vue 3',
    ],
    stack: ['CSS3', 'Vue 3', 'Design Tokens', 'Open Source'],
    accent: '#CCFF00',
    githubUrl: 'https://github.com/fvrvz/nostyle-css',
    liveUrl: 'https://nostylecss.byfaraaz.com/',
  },
  {
    id: 'edai',
    num: '06',
    title: 'EdAI',
    category: 'Multi-Tenant RAG AI LMS',
    year: '2025',
    summary:
      'AI-powered learning platform isolating corporate knowledge bases with vector similarity search and grounded chat.',
    highlights: [
      'Supabase pgvector semantic retrieval pipeline',
      'Grok AI (xAI) inference proxy with serverless routines',
      'Cross-platform React Native (Expo 56) mobile client',
    ],
    stack: ['React Native', 'Supabase pgvector', 'Grok AI', 'RAG Pipeline'],
    accent: '#FF3B1D',
    githubUrl: 'https://github.com/fvrvz/edai',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'nexturn',
    period: 'NOV 2024 — PRESENT',
    company: 'NexTurn',
    role: 'Cloud Engineer — Fullstack',
    location: 'Enterprise & AI',
    overview:
      'Leading modern frontend rewrites, micro-frontends, and Agentic AI integrations across enterprise platforms.',
    achievements: [
      'BridalLive Modernization: Led full POS rewrite with SvelteKit, Tailwind CSS, shadcn/ui, Superforms, LayerChart & Vitest.',
      'EZClaim Online: Engineered medical claims workflows in Angular 18+ using Signals, NgRx, and dynamic oData queries.',
      'Club Prophet Reporting: Embedded custom Apache Superset 6 dashboards into Angular SSR secured via Keycloak OIDC.',
      'NextElevate AI: Built internal RAG app with Next.js 16, Supabase pgvector, Grok AI, Cloudflare R2 & Entra ID / Cognito.',
      'Published reusable AI smart-reporting web components in Svelte 5 as internal npm packages.',
    ],
    tags: ['SvelteKit', 'Angular 18+', 'Next.js 16', 'pgvector', 'Keycloak'],
  },
  {
    id: 'incture',
    period: 'MAY 2024 — NOV 2024',
    company: 'Incture Technologies',
    role: 'Software Engineer — Frontend',
    location: 'Cherrywork Suite',
    overview:
      'Architected the WorkPortal micro-frontend host shell and WorkBench low-code mobile studio.',
    achievements: [
      'Built unified micro-frontend host shell in React 18, TypeScript, and Redux uniting multiple enterprise apps.',
      'Engineered shared auth, telemetry, and i18n libraries reducing cross-team duplication by 80–90%.',
      'Created schema-driven dynamic form & decision workflow builder for non-technical business users.',
    ],
    tags: ['React 18', 'Micro-Frontends', 'TypeScript', 'Redux', 'Low-Code'],
  },
  {
    id: 'infosys',
    period: 'SEP 2021 — MAY 2024',
    company: 'Infosys',
    role: 'Senior System Engineer — Fullstack',
    location: 'Infosys Cortex',
    overview:
      'Built modular Angular micro-frontends and Spring Boot / AWS microservices for intelligent automation.',
    achievements: [
      'Developed isolated Angular micro-frontends for high-concurrency enterprise orchestration suites.',
      'Integrated Salesforce, ServiceNow, Google Dialogflow & OpenAI Whisper speech-to-text pipelines.',
      'Built Java / Spring Boot REST APIs, Spring Security policies, AWS Lambda functions & PostgreSQL/Liquibase schemas.',
    ],
    tags: ['Angular', 'Spring Boot', 'AWS Lambda', 'Whisper AI', 'PostgreSQL'],
  },
];

export const HONORS: HonorItem[] = [
  {
    title: 'On The Spot Award',
    org: 'NexTurn',
    year: '2025',
    detail: 'Architectural ownership on the BridalLive modernization & rapid full-stack delivery.',
  },
  {
    title: '"The Dashing Debut" Award',
    org: 'Incture Technologies',
    year: '2024',
    detail: 'Authoring reusable enterprise auth libraries adopted across multiple product suites.',
  },
  {
    title: 'Infosys Insta Award',
    org: 'Infosys',
    year: '2023',
    detail: 'Consistent delivery excellence and AI speech integration on Infosys Cortex.',
  },
];
