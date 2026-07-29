import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { CheckIcon, CircleDashedIcon, AlertTriangleIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { JourneyStep } from '@/components/how-it-works/JourneyStep'
import { ProfileMockup } from '@/components/how-it-works/ProfileMockup'
import { Reveal } from '@/components/how-it-works/Reveal'

function InternshipRequirementMockup() {
  const requirements = [
    { skill: 'React', met: true },
    { skill: 'TypeScript', met: true },
    { skill: 'Git', met: true },
    { skill: 'Next.js', met: false },
  ]

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col gap-4 p-5">
        <p className="font-display text-sm font-semibold text-ink-900">
          Frontend Developer Intern
        </p>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            Required Skills
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {requirements.map((req) => (
              <li key={req.skill} className="flex items-center gap-2 text-sm">
                {req.met ? (
                  <CheckIcon className="text-success-600" width={15} height={15} />
                ) : (
                  <CircleDashedIcon className="text-ink-400" width={15} height={15} />
                )}
                <span className={req.met ? 'text-ink-800' : 'text-ink-500'}>
                  {req.skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            Experience
          </p>
          <p className="mt-1 text-sm text-ink-700">0-1 years</p>
        </div>
      </CardContent>
    </Card>
  )
}

function MatchScoreMockup() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
        <MatchRing value={92} size={88} />
        <div>
          <p className="font-display text-base font-semibold text-ink-900">
            Excellent Match
          </p>
          <p className="mt-1 text-sm text-ink-600">
            Your skills strongly align with this internship.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function SkillGapMockup() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-ink-600">Your Match</p>
          <span className="font-display text-lg font-semibold text-ink-900">78%</span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            You already have
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {['React', 'TypeScript', 'Git'].map((skill) => (
              <li key={skill} className="flex items-center gap-2 text-sm text-ink-800">
                <CheckIcon className="text-success-600" width={15} height={15} />
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            Skills to improve
          </p>
          <ul className="mt-2 flex flex-col gap-1.5">
            {['Next.js', 'REST APIs'].map((skill) => (
              <li key={skill} className="flex items-center gap-2 text-sm text-ink-700">
                <AlertTriangleIcon className="text-warning-600" width={15} height={15} />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function RecommendationsMockup() {
  const roles = [
    { title: 'Frontend Developer Intern', match: 92 },
    { title: 'UI/UX Developer Intern', match: 86 },
    { title: 'Full Stack Developer Intern', match: 81 },
  ]

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {roles.map((role) => (
        <Card key={role.title}>
          <CardContent className="flex items-center justify-between gap-3 p-4">
            <p className="text-sm font-medium text-ink-900">{role.title}</p>
            <Badge tone="primary">{role.match}% Match</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ApplyTrackMockup() {
  const stages = ['Match', 'Review', 'Apply', 'Track', 'Internship']

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col gap-3 p-5">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center gap-3">
            <span className={cnStageDot(index)} aria-hidden />
            <span className="text-sm text-ink-800">{stage}</span>
          </div>
        ))}
        <p className="mt-1 text-xs text-ink-500">
          Application tracking is coming soon -- shown here as the final stage of the
          journey.
        </p>
      </CardContent>
    </Card>
  )
}

function cnStageDot(index: number) {
  return index === 0
    ? 'h-2.5 w-2.5 rounded-full bg-primary-600'
    : 'h-2.5 w-2.5 rounded-full border border-border-strong bg-surface'
}

const steps = [
  {
    number: '01',
    title: 'Build Your Profile',
    description:
      'Tell SkillMatch about your education, skills, projects, experience, and career interests.',
    visual: <ProfileMockup />,
  },
  {
    number: '02',
    title: 'Discover Opportunities',
    description:
      'Internship requirements are compared against your profile, so you see what each role is really looking for.',
    visual: <InternshipRequirementMockup />,
  },
  {
    number: '03',
    title: 'Get Your Match Score',
    description:
      'A clear percentage shows how closely your skills and experience align with each internship.',
    visual: <MatchScoreMockup />,
  },
  {
    number: '04',
    title: 'Understand Your Skill Gaps',
    description:
      "SkillMatch doesn't just say whether you qualify -- it shows exactly which skills would strengthen your candidacy.",
    visual: <SkillGapMockup />,
  },
  {
    number: '05',
    title: 'Get Personalized Recommendations',
    description:
      'Based on your profile and skills, SkillMatch surfaces internships ranked by how well they fit you.',
    visual: <RecommendationsMockup />,
  },
  {
    number: '06',
    title: 'Apply & Track',
    description:
      'Move from a strong match to a submitted application, with visibility into where each one stands.',
    visual: <ApplyTrackMockup />,
  },
]

export function JourneySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Your Journey"
          title="Your Journey with SkillMatch"
          subtitle="From creating your profile to finding your next opportunity, SkillMatch helps you understand where you fit and where you can grow."
        />
      </Reveal>

      <div className="mt-14 flex flex-col gap-16">
        {steps.map((step, index) => (
          <JourneyStep
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
            visual={step.visual}
            reverse={index % 2 === 1}
            delay={index * 40}
          />
        ))}
      </div>
    </section>
  )
}
