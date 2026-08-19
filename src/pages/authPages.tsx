import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { AuthLayout } from '@/features/auth/AuthLayout'
import { PageStatus } from '@/features/auth/ProtectedRoute'
import { useAuth } from '@/features/auth/useAuth'
import { supabase } from '@/lib/supabaseClient'
import { sendPasswordReset, signIn, signUp, updatePassword } from '@/services/authService'
import type { PublicRegistrationRole } from '@/types/auth'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { SelectField } from '@/components/ui/SelectField'

function AuthHeading({ children }: { children: string }) {
  return <h1 className="mt-6 font-display text-2xl font-semibold text-ink-950">{children}</h1>
}

function AuthError({ message }: { message: string | null }) {
  return message ? (
    <p className="mt-4 rounded-md bg-danger-50 p-3 text-sm text-danger-600">{message}</p>
  ) : null
}

function SubmitButton({ isSubmitting, children }: { isSubmitting: boolean; children: string }) {
  return (
    <Button className="mt-5 w-full" isLoading={isSubmitting} type="submit">
      {isSubmitting ? 'Please wait…' : children}
    </Button>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, profile, isLoading } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoading) return <PageStatus message="Loading…" />
  // Already authenticated: skip the login form entirely and go straight to the
  // role-appropriate dashboard, matching real production SaaS behavior.
  if (user && profile) return <Navigate to={ROLE_DASHBOARD_ROUTES[profile.role]} replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    const form = new FormData(event.currentTarget)
    const { error: signInError } = await signIn(String(form.get('email')), String(form.get('password')))
    setIsSubmitting(false)
    if (signInError) {
      setError(signInError.message)
      return
    }
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
    navigate(from ?? APP_ROUTES.home, { replace: true })
  }

  return (
    <AuthLayout>
      <AuthHeading>Welcome back</AuthHeading>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="Email" name="email" type="email" />
        <FormField label="Password" name="password" type="password" />
        <SubmitButton isSubmitting={isSubmitting}>Sign in</SubmitButton>
      </form>
      <AuthError message={error} />
      <p className="mt-5 text-sm text-ink-600">
        <Link className="font-medium text-primary-600 hover:text-primary-700" to={APP_ROUTES.forgotPassword}>
          Forgot password?
        </Link>{' '}
        ·{' '}
        <Link className="font-medium text-primary-600 hover:text-primary-700" to={APP_ROUTES.register}>
          Create account
        </Link>
      </p>
    </AuthLayout>
  )
}

export function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { user, profile, isLoading } = useAuth()

  if (isLoading) return <PageStatus message="Loading…" />
  if (user && profile) return <Navigate to={ROLE_DASHBOARD_ROUTES[profile.role]} replace />

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    const form = new FormData(event.currentTarget)
    const password = String(form.get('password'))
    const confirmation = String(form.get('passwordConfirmation'))
    if (password !== confirmation) {
      setError('Passwords do not match.')
      return
    }
    setIsSubmitting(true)
    const { data, error: signUpError } = await signUp({
      fullName: String(form.get('fullName')),
      email: String(form.get('email')),
      password,
      role: String(form.get('role')) as PublicRegistrationRole,
    })
    setIsSubmitting(false)
    if (signUpError) {
      setError(signUpError.message)
      return
    }
    if (data.user && !data.session) navigate(APP_ROUTES.verifyEmail, { replace: true })
  }

  return (
    <AuthLayout>
      <AuthHeading>Create your account</AuthHeading>
      <p className="mt-2 text-sm text-ink-600">Administrators are provisioned by the platform team.</p>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField label="Full name" name="fullName" />
        <FormField label="Email" name="email" type="email" />
        <SelectField label="I am a" name="role" defaultValue="student">
          <option value="student">Student</option>
          <option value="company">Company / recruiter</option>
        </SelectField>
        <FormField label="Password" name="password" type="password" minLength={8} />
        <FormField label="Confirm password" name="passwordConfirmation" type="password" minLength={8} />
        <SubmitButton isSubmitting={isSubmitting}>Create account</SubmitButton>
      </form>
      <AuthError message={error} />
      <p className="mt-5 text-sm text-ink-600">
        Already registered?{' '}
        <Link className="font-medium text-primary-600 hover:text-primary-700" to={APP_ROUTES.login}>
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}

export function VerifyEmailPage() {
  const { user } = useAuth()
  return (
    <AuthLayout>
      <AuthHeading>Verify your email</AuthHeading>
      <p className="mt-3 text-sm text-ink-600">
        We sent a confirmation link to {user?.email ?? 'your email address'}. Open it to activate your
        account, then return here.
      </p>
      <Link
        className="mt-6 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
        to={APP_ROUTES.login}
      >
        Back to sign in
      </Link>
    </AuthLayout>
  )
}

export function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)
    const { error: requestError } = await sendPasswordReset(String(new FormData(event.currentTarget).get('email')))
    setIsSubmitting(false)
    if (requestError) setError(requestError.message)
    else setSent(true)
  }

  return (
    <AuthLayout>
      <AuthHeading>Reset your password</AuthHeading>
      {sent ? (
        <p className="mt-4 text-sm text-ink-600">If an account exists for that address, a reset link is on its way.</p>
      ) : (
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormField label="Email" name="email" type="email" />
          <SubmitButton isSubmitting={isSubmitting}>Send reset link</SubmitButton>
        </form>
      )}
      <AuthError message={error} />
    </AuthLayout>
  )
}

export function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null)
  const [completed, setCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const password = String(form.get('password'))
    if (password !== String(form.get('passwordConfirmation'))) {
      setError('Passwords do not match.')
      return
    }
    setIsSubmitting(true)
    const { error: updateError } = await updatePassword(password)
    setIsSubmitting(false)
    if (updateError) setError(updateError.message)
    else setCompleted(true)
  }

  return (
    <AuthLayout>
      <AuthHeading>Choose a new password</AuthHeading>
      {completed ? (
        <p className="mt-4 text-sm">
          <Link className="font-medium text-primary-600 hover:text-primary-700" to={APP_ROUTES.login}>
            Password updated — sign in
          </Link>
        </p>
      ) : (
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormField label="New password" name="password" type="password" minLength={8} />
          <FormField label="Confirm password" name="passwordConfirmation" type="password" minLength={8} />
          <SubmitButton isSubmitting={isSubmitting}>Update password</SubmitButton>
        </form>
      )}
      <AuthError message={error} />
    </AuthLayout>
  )
}

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code')
    if (!code) {
      setError('This verification link is incomplete or has expired. Request a new verification email.')
      return
    }
    void supabase.auth.exchangeCodeForSession(code).then(({ error: exchangeError }) => {
      if (exchangeError) setError(exchangeError.message)
      else navigate(APP_ROUTES.home, { replace: true })
    })
  }, [location.search, navigate])

  return error ? (
    <AuthLayout>
      <AuthHeading>Link could not be verified</AuthHeading>
      <AuthError message={error} />
    </AuthLayout>
  ) : (
    <PageStatus message="Verifying your email…" />
  )
}
