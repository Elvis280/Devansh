// src/api/portfolio.ts
// Typed API client that fetches all portfolio data from the FastAPI backend.

import axios from 'axios'

// In dev, Vite proxies /api → localhost:8000
// In production, set VITE_API_BASE to your deployed backend URL
const BASE = import.meta.env.VITE_API_BASE || ''

const api = axios.create({
  baseURL: BASE,
  timeout: 10_000,
})

// ── Types (mirroring backend Pydantic-like shapes) ─────────────────────────

export interface PersonalInfo {
  name: string
  handle: string
  title: string
  role_headline: string
  statement: string
  email: string
  phone: string
  github: string
  linkedin: string
  twitter: string
  leetcode: string
  location: string
  country: string
  status: string
  metadata_tags: string[]
  bio: string
  editorial_bio: string
  objective: string
  education: {
    institution: string
    degree: string
    period: string
    location: string
  }
  avatar: string
  cv: string
  roles: string[]
}

export interface PersonalityItem {
  text: string
  desc: string
}

export interface Personality {
  i_like: PersonalityItem[]
  i_dont_like: PersonalityItem[]
}

export interface Stat {
  label: string
  value: string
}

export interface SkillCategory {
  id: string
  label: string
  icon: string
  color: string
  skills: string[]
}

export interface WorkflowStep {
  label: string
  desc: string
}

export interface CaseStudy {
  problem: string
  approach: string
  architecture: string
  challenges: string
  result: string
}

export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  image: string
  gradient: string
  tech: string[]
  github: string
  demo: string
  featured: boolean
  category: string
  workflow: WorkflowStep[]
  case_study: CaseStudy
}

export interface Experiment {
  id: string
  number: string
  question: string
  title: string
  category: string
  status: 'CONCLUDED' | 'ACTIVE RESEARCH' | 'PIVOTED'
  hypothesis: string
  tech: string[]
  implementation: string
  result: string
  what_went_wrong: string
  what_learned: string
  date: string
  log_snippet?: string
}

export interface JourneyRole {
  title: string
  org: string
  period: string
}

export interface JourneyMilestone {
  year: string
  title: string
  tagline: string
  description: string
  highlights: string[]
  roles: JourneyRole[]
  achievements: string[]
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
  image: string
  url: string
  skills: string[]
  color: string
}

// ── API Calls ──────────────────────────────────────────────────────────────

export const fetchPersonal = (): Promise<PersonalInfo> =>
  api.get('/api/personal').then((r) => r.data)

export const fetchPersonality = (): Promise<Personality> =>
  api.get('/api/personality').then((r) => r.data)

export const fetchStats = (): Promise<Stat[]> =>
  api.get('/api/stats').then((r) => r.data)

export const fetchSkills = (): Promise<SkillCategory[]> =>
  api.get('/api/skills').then((r) => r.data)

export const fetchProjects = (featured?: boolean): Promise<Project[]> =>
  api.get('/api/projects', { params: featured !== undefined ? { featured } : {} }).then((r) => r.data)

export const fetchExperiments = (status?: string): Promise<Experiment[]> =>
  api.get('/api/experiments', { params: status ? { status } : {} }).then((r) => r.data)

export const fetchJourney = (): Promise<JourneyMilestone[]> =>
  api.get('/api/journey').then((r) => r.data)

export const fetchCertificates = (): Promise<Certificate[]> =>
  api.get('/api/certificates').then((r) => r.data)
