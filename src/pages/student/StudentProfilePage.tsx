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
import { TagInput } from '@/components/ui/TagInput'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorState } from '@/components/ui/ErrorState'
import { MatchRing } from '@/components/ui/MatchRing'
import { ProfileHeader } from '@/components/dashboard/ProfileHeader'
import { useStudentProfile } from '@/features/studentProfile/useStudentProfile'
import { studentProfileToFormValues } from '@/types/studentProfile'
import type { StudentProfileFormValues, RemotePreference } from '@/types/studentProfile'
import { REMOTE_PREFERENCES } from '@/types/studentProfile'
import { calculateProfileCompletion } from '@/utils/profileCompletion'

const REMOTE_PREFERENCE_LABELS: Record<RemotePreference, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
  flexible: 'Flexible',
}

export function StudentProfilePage() {
  const navigate = useNavigate()
  const { profile, isLoading, error, isSaving, save } = useStudentProfile()
  const [values, setValues] = useState<StudentProfileFormValues>(
    studentProfileToFormValues(null),
  )
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    setValues(studentProfileToFormValues(profile))
  }, [profile])

  function updateField<K extends keyof StudentProfileFormValues>(
    key: K,
    value: StudentProfileFormValues[K],
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
        <Spinner label="Loading your profile…" />
      </div>
    )
  }

  const completion = calculateProfileCompletion(profile)
  const completionMessage =
    completion.percent === 100
      ? "You're all set — your profile is complete."
      : `Add ${completion.missingFields[0]!.toLowerCase()} to improve your matches.`

  return (
    <div className="flex flex-col gap-8">
      <ProfileHeader
        title="Your profile"
        rightSlot={
          <>
            <MatchRing value={completion.percent} size={64} />
            <div className="max-w-[12rem]">
              <p className="text-sm font-semibold text-ink-900">Profile completion</p>
              <p className="text-xs text-ink-600">{completionMessage}</p>
            </div>
          </>
        }
      />

      {error && <ErrorState title="Something went wrong" description={error} />}

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <Card>
          <CardHeader>
            <CardTitle>Personal info</CardTitle>
            <CardDescription>
              How companies and SkillMatch will refer to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Headline"
              placeholder="Aspiring frontend engineer"
              value={values.headline}
              onChange={(event) => updateField('headline', event.target.value)}
            />
            <FormField
              label="Phone"
              type="tel"
              placeholder="+1 555 123 4567"
              value={values.phone}
              onChange={(event) => updateField('phone', event.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>Where you're based, or hoping to intern.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="City"
              placeholder="Singapore"
              value={values.locationCity}
              onChange={(event) => updateField('locationCity', event.target.value)}
            />
            <FormField
              label="Country"
              placeholder="Singapore"
              value={values.locationCountry}
              onChange={(event) => updateField('locationCountry', event.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Your current or most recent school.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="School"
              placeholder="National University of Singapore"
              value={values.schoolName}
              onChange={(event) => updateField('schoolName', event.target.value)}
            />
            <FormField
              label="Degree"
              placeholder="B.Sc. Computer Science"
              value={values.degree}
              onChange={(event) => updateField('degree', event.target.value)}
            />
            <FormField
              label="Field of study"
              placeholder="Computer Science"
              value={values.fieldOfStudy}
              onChange={(event) => updateField('fieldOfStudy', event.target.value)}
            />
            <FormField
              label="Graduation year"
              type="number"
              placeholder="2027"
              value={values.graduationYear}
              onChange={(event) => updateField('graduationYear', event.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Career goals</CardTitle>
            <CardDescription>
              What are you hoping to get out of an internship?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TextareaField
              label="Career goals"
              placeholder="I'm looking to build hands-on experience with production frontend systems..."
              value={values.careerGoals}
              onChange={(event) => updateField('careerGoals', event.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Internship preferences</CardTitle>
            <CardDescription>
              Helps SkillMatch rank opportunities for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <TagInput
              label="Preferred roles"
              values={values.preferredRoles}
              onChange={(next) => updateField('preferredRoles', next)}
              placeholder="Type a role and press Enter"
              hint="e.g. Frontend Engineer, Data Analyst"
            />
            <TagInput
              label="Preferred locations"
              values={values.preferredLocations}
              onChange={(next) => updateField('preferredLocations', next)}
              placeholder="Type a location and press Enter"
              hint="e.g. Singapore, Remote"
            />
            <SelectField
              label="Work preference"
              value={values.remotePreference}
              onChange={(event) =>
                updateField(
                  'remotePreference',
                  event.target.value as RemotePreference | '',
                )
              }
            >
              <option value="">Select one</option>
              {REMOTE_PREFERENCES.map((preference) => (
                <option key={preference} value={preference}>
                  {REMOTE_PREFERENCE_LABELS[preference]}
                </option>
              ))}
            </SelectField>
            <FormField
              label="Available from"
              type="date"
              value={values.availabilityStartDate}
              onChange={(event) =>
                updateField('availabilityStartDate', event.target.value)
              }
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
                onClick={() => navigate('/student')}
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
