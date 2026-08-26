// src/hooks/usePortfolioData.ts
// React Query hooks for all portfolio data endpoints.

import { useQuery } from '@tanstack/react-query'
import {
  fetchPersonal,
  fetchPersonality,
  fetchStats,
  fetchSkills,
  fetchProjects,
  fetchExperiments,
  fetchJourney,
  fetchCertificates,
} from '@/api/portfolio'

export const usePersonal = () =>
  useQuery({ queryKey: ['personal'], queryFn: fetchPersonal, staleTime: Infinity })

export const usePersonality = () =>
  useQuery({ queryKey: ['personality'], queryFn: fetchPersonality, staleTime: Infinity })

export const useStats = () =>
  useQuery({ queryKey: ['stats'], queryFn: fetchStats, staleTime: Infinity })

export const useSkills = () =>
  useQuery({ queryKey: ['skills'], queryFn: fetchSkills, staleTime: Infinity })

export const useProjects = (featured?: boolean) =>
  useQuery({
    queryKey: ['projects', featured],
    queryFn: () => fetchProjects(featured),
    staleTime: Infinity,
  })

export const useExperiments = (status?: string) =>
  useQuery({
    queryKey: ['experiments', status],
    queryFn: () => fetchExperiments(status),
    staleTime: Infinity,
  })

export const useJourney = () =>
  useQuery({ queryKey: ['journey'], queryFn: fetchJourney, staleTime: Infinity })

export const useCertificates = () =>
  useQuery({ queryKey: ['certificates'], queryFn: fetchCertificates, staleTime: Infinity })
