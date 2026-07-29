import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card'
import { FormField } from '@/components/ui/FormField'
import { TextareaField } from '@/components/ui/TextareaField'
import { SelectField } from '@/components/ui/SelectField'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { Badge } from '@/components/ui/Badge'
import { useCompanyProfile } from '@/features/companyProfile/useCompanyProfile'
import { companyProfileToFormValues } from '@/types/companyProfile'
import type { CompanyProfileFormValues, CompanySizeRange } from '@/types/companyProfile'
import { COMPANY_SIZE_RANGES } from '@/types/companyProfile'
import { VERIFICATION_STATUS_DISPLAY } from '@/utils/verificationStatus'

export function CompanyProfilePage() {
  const navigate = useNavigate()
  const { profile, isLoading, error, isSaving, save } = useCompanyProfile()
  const [values, setValues] = useState<CompanyProfileFormValues>(
    companyProfileToFormValues(null),
  )
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    setValues(companyProfileToFormValues(profile))
  }, [profile])

  function updateField<K extends keyof CompanyProfileFormValues>(
    key: K,
    value: CompanyProfileFormValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }))
    setJustSaved(false)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const succeeded = await save(values)
    setJustSaved(succeeded)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner label="Loading your company profile…" />
      </div>
    )
  }

  const statusDisplay =
    VERIFICATION_STATUS_DISPLAY[profile?.verificationStatus ?? 'pending']

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink-950">
            Company profile
          </h1>
          <p className="text-sm text-ink-600">
            These details appear on your listings once your company is verified.
          </p>
        </div>
        <Badge tone={statusDisplay.tone} className="shrink-0">
          {statusDisplay.label}
        </Badge>
      </div>

      {error && <ErrorState title="Something went wrong" description={error} />}

      <Card>
        <CardHeader>
          <CardTitle>Verification status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-ink-600">{statusDisplay.description}</p>
        </CardContent>
      </Card>

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="flex flex-col gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Company details</CardTitle>
            <CardDescription>
              The basics students will see about your company.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Company name"
              placeholder="Northline Analytics"
              value={values.companyName}
              onChange={(event) => updateField('companyName', event.target.value)}
            />
            <FormField
              label="Industry"
              placeholder="Financial technology"
              value={values.industry}
              onChange={(event) => updateField('industry', event.target.value)}
            />
            <SelectField
              label="Company size"
              value={values.companySize}
              onChange={(event) =>
                updateField('companySize', event.target.value as CompanySizeRange | '')
              }
            >
              <option value="">Select one</option>
              {COMPANY_SIZE_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range} employees
                </option>
              ))}
            </SelectField>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="HQ city"
                placeholder="Singapore"
                value={values.headquartersCity}
                onChange={(event) => updateField('headquartersCity', event.target.value)}
              />
              <FormField
                label="HQ country"
                placeholder="Singapore"
                value={values.headquartersCountry}
                onChange={(event) =>
                  updateField('headquartersCountry', event.target.value)
                }
              />
            </div>
            <div className="sm:col-span-2">
              <TextareaField
                label="About"
                placeholder="Tell students what your company does and what it's like to intern here..."
                value={values.about}
                onChange={(event) => updateField('about', event.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branding & links</CardTitle>
            <CardDescription>Your logo, website, and social profiles.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-end gap-3 sm:col-span-2">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted">
                {values.logoUrl ? (
                  <img
                    src={values.logoUrl}
                    alt="Company logo preview"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <span className="text-xs text-ink-400">No logo</span>
                )}
              </div>
              <div className="flex-1">
                <FormField
                  label="Logo URL"
                  placeholder="https://example.com/logo.png"
                  value={values.logoUrl}
                  onChange={(event) => updateField('logoUrl', event.target.value)}
                />
              </div>
            </div>
            <FormField
              label="Website"
              type="url"
              placeholder="https://example.com"
              value={values.websiteUrl}
              onChange={(event) => updateField('websiteUrl', event.target.value)}
            />
            <FormField
              label="LinkedIn"
              type="url"
              placeholder="https://linkedin.com/company/example"
              value={values.linkedinUrl}
              onChange={(event) => updateField('linkedinUrl', event.target.value)}
            />
            <FormField
              label="X / Twitter"
              type="url"
              placeholder="https://x.com/example"
              value={values.twitterUrl}
              onChange={(event) => updateField('twitterUrl', event.target.value)}
            />
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-sm text-ink-600">
              {justSaved && !isSaving ? 'Saved.' : '\u00A0'}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/company')}
              >
                Back to dashboard
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save profile'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
