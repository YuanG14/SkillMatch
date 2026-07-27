import { supabase } from '@/lib/supabaseClient'
import type { PublicRegistrationRole, UserProfile } from '@/types/auth'

interface SignUpInput {
  fullName: string
  email: string
  password: string
  role: PublicRegistrationRole
}

export async function signUp({ fullName, email, password, role }: SignUpInput) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function sendPasswordReset(email: string) {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
}

export async function updatePassword(password: string) {
  return supabase.auth.updateUser({ password })
}

export async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, created_at')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    role: data.role,
    createdAt: data.created_at,
  }
}
