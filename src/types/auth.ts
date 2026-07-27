import type { Session, User } from '@supabase/supabase-js'

export const USER_ROLES = ['student', 'company', 'admin'] as const

export type UserRole = (typeof USER_ROLES)[number]
export type PublicRegistrationRole = Exclude<UserRole, 'admin'>

export interface UserProfile {
  id: string
  email: string
  fullName: string | null
  role: UserRole
  createdAt: string
}

export interface AuthState {
  isLoading: boolean
  session: Session | null
  user: User | null
  profile: UserProfile | null
}

export interface AuthContextValue extends AuthState {
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}
