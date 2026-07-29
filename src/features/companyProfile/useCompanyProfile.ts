import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/features/auth/useAuth'
import { fetchCompanyProfile, saveCompanyProfile } from '@/services/companyProfileService'
import type { CompanyProfile, CompanyProfileFormValues } from '@/types/companyProfile'

interface UseCompanyProfileResult {
  profile: CompanyProfile | null
  isLoading: boolean
  error: string | null
  isSaving: boolean
  save: (values: CompanyProfileFormValues) => Promise<boolean>
}

export function useCompanyProfile(): UseCompanyProfileResult {
  const { user } = useAuth()
  const [profile, setProfile] = useState<CompanyProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setIsLoading(false)
      return
    }

    let cancelled = false
    setIsLoading(true)
    setError(null)

    fetchCompanyProfile(user.id)
      .then((result) => {
        if (!cancelled) setProfile(result)
      })
      .catch(() => {
        if (!cancelled)
          setError('We could not load your company profile. Please try again.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [user])

  const save = useCallback(
    async (values: CompanyProfileFormValues) => {
      if (!user) return false
      setIsSaving(true)
      setError(null)
      try {
        const updated = await saveCompanyProfile(user.id, values)
        setProfile(updated)
        return true
      } catch {
        setError('We could not save your company profile. Please try again.')
        return false
      } finally {
        setIsSaving(false)
      }
    },
    [user],
  )

  return { profile, isLoading, error, isSaving, save }
}
