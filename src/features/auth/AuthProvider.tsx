import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { fetchProfile } from '@/services/authService'
import type { AuthContextValue, AuthState } from '@/types/auth'

export const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

const initialState: AuthState = {
  isLoading: true,
  session: null,
  user: null,
  profile: null,
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>(initialState)

  const setSession = useCallback(async (session: AuthState['session']) => {
    if (!session) {
      setAuthState({ ...initialState, isLoading: false })
      return
    }

    try {
      const profile = await fetchProfile(session.user.id)
      setAuthState({ isLoading: false, session, user: session.user, profile })
    } catch {
      setAuthState({ isLoading: false, session, user: session.user, profile: null })
    }
  }, [])

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void setSession(session)
    })
    return () => listener.subscription.unsubscribe()
  }, [setSession])

  const refreshProfile = useCallback(async () => {
    if (!authState.user) return
    const profile = await fetchProfile(authState.user.id)
    setAuthState((current) => ({ ...current, profile }))
  }, [authState.user])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }, [])

  const value = useMemo(
    () => ({ ...authState, signOut, refreshProfile }),
    [authState, refreshProfile, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
