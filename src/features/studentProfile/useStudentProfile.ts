import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/features/auth/useAuth'
import { fetchStudentProfile, saveStudentProfile } from '@/services/studentProfileService'
import type { StudentProfile, StudentProfileFormValues } from '@/types/studentProfile'

interface UseStudentProfileResult {
  profile: StudentProfile | null
  isLoading: boolean
  error: string | null
  isSaving: boolean
  save: (values: StudentProfileFormValues) => Promise<boolean>
}

export function useStudentProfile(): UseStudentProfileResult {
  const { user } = useAuth()
  const [profile, setProfile] = useState<StudentProfile | null>(null)
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

    fetchStudentProfile(user.id)
      .then((result) => {
        if (!cancelled) setProfile(result)
      })
      .catch(() => {
        if (!cancelled) setError('We could not load your profile. Please try again.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [user])

  const save = useCallback(
    async (values: StudentProfileFormValues) => {
      if (!user) return false
      setIsSaving(true)
      setError(null)
      try {
        const updated = await saveStudentProfile(user.id, values)
        setProfile(updated)
        return true
      } catch {
        setError('We could not save your profile. Please try again.')
        return false
      } finally {
        setIsSaving(false)
      }
    },
    [user],
  )

  return { profile, isLoading, error, isSaving, save }
}
