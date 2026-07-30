import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { APP_ROUTES, ROLE_DASHBOARD_ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/useAuth'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import {
  BriefcaseIcon,
  ChartIcon,
  FileTextIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from '@/components/ui/icons'

const problems = [
  'Dozens of listings that all sound the same',
  'Requirements that are vague until after you apply',
  'No way to tell if you\u2019re actually qualified',
  'Applying to roles that were never a fit',
  'No idea which skills are holding you back',
  'Applications scattered across emails and tabs',
]

const solutionInputs = ['Skills', 'Education', 'Projects', 'Experience', 'Preferences']

const matchedSkills = ['React', 'TypeScript', 'Git', 'HTML/CSS']
const skillGaps = ['Next.js', 'REST APIs']

const recommendations = [
  {
    role: 'Frontend Developer Intern',
    company: 'Northline Analytics',
    location: 'Remote',
    match: 92,
    skills: ['React', 'TypeScript', 'Git'],
  },
  {
    role: 'UI/UX Design Intern',
    company: 'Basalt Studio',
    location: 'Hybrid',
    match: 84,
    skills: ['Figma', 'Design Systems'],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Verano Labs',
    location: 'On-site',
    match: 79,
    skills: ['Node.js', 'SQL', 'React'],
  },
]

const journey = [
  {
    number: '01',
    title: 'Build your profile',
    description: 'Add your education, skills, projects, experience, and preferences.',
  },
  {
    number: '02',
    title: 'Discover opportunities',
    description: 'Browse internships that line up with your profile.',
  },
  {
    number: '03',
    title: 'Understand your match',
    description: 'See your Match Score and why an opportunity fits.',
  },
  {
    number: '04',
    title: 'Apply with confidence',
    description: 'Use skill gap insights and recommendations to apply smarter.',
  },
]

const benefits = [
  {
    icon: SearchIcon,
    title: 'Find better-fit internships',
    description: 'Spend less time browsing listings that were never going to fit.',
  },
  {
    icon: ChartIcon,
    title: 'Understand your strengths',
    description: 'See which skills make you a strong candidate for a role.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Identify skill gaps',
    description: 'Know exactly what to learn next to become a stronger applicant.',
  },
  {
    icon: UsersIcon,
    title: 'Build a stronger profile',
    description:
      'Showcase your education, projects, skills, and experience in one place.',
  },
  {
    icon: FileTextIcon,
    title: 'Make better applications',
    description: 'Understand an opportunity before you spend time applying.',
  },
  {
    icon: SettingsIcon,
    title: 'Track your progress',
    description: 'Keep every application organized from submitted to offer.',
  },
]

export function ForStudentsPage() {
  const { profile } = useAuth()

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'SkillMatch for Students | Find Internships That Match Your Skills'
    return () => {
      document.title = previousTitle
    }
  }, [])

  const primaryCta = profile
    ? { label: 'Go to Dashboard', to: ROLE_DASHBOARD_ROUTES[profile.role] }
    : { label: 'Find Your Match', to: APP_ROUTES.register }

  return (
    <>
      {/* 1. Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink-950 sm:text-5xl">
              Find internships that match your skills.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-600">
              Stop applying blindly. SkillMatch analyzes your skills, education,
              experience, projects, and preferences to surface internships that actually
              fit what you know and where you want to go.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link to={primaryCta.to}>
                <Button size="lg">{primaryCta.label}</Button>
              </Link>
              <a
                href="#how-matching-works"
                className="text-sm font-medium text-ink-700 hover:text-ink-900"
              >
                How it works &rarr;
              </a>
            </div>
          </div>

          {/* Hero product visual: internship card with match + skill breakdown */}
          <div className="relative">
            <Card className="relative z-10 p-6">
              <CardContent className="flex flex-col gap-6 p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-base font-semibold text-ink-900">
                      Frontend Developer Intern
                    </p>
                    <p className="text-sm text-ink-600">Northline Analytics</p>
                  </div>
                  <MatchRing value={92} size={64} />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    Matched skills
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {matchedSkills.map((skill) => (
                      <Badge key={skill} tone="success">
                        &#10003; {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    Skill gaps
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {skillGaps.map((skill) => (
                      <Badge key={skill} tone="warning">
                        &#9888; {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Badge
              tone="primary"
              className="absolute -top-4 -right-4 z-20 hidden shadow-[0_4px_12px_rgba(42,82,224,0.18)] sm:inline-flex"
            >
              Recommended for you
            </Badge>
            <Badge
              tone="neutral"
              className="absolute -bottom-4 -left-4 z-20 hidden bg-surface shadow-[0_4px_12px_rgba(16,24,40,0.08)] sm:inline-flex"
            >
              3 matched skills &middot; 2 to improve
            </Badge>
            <div
              aria-hidden
              className="absolute inset-8 -z-10 rounded-full bg-primary-100/60 blur-3xl"
            />
          </div>
        </div>
      </section>

      {/* 2. The student problem */}
      <section className="border-t border-border bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display max-w-2xl text-2xl font-semibold text-ink-950 sm:text-3xl">
            Finding an internship shouldn&apos;t feel like guessing.
          </h2>
          <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <div key={problem} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                <p className="text-sm text-ink-700">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SkillMatch solution */}
      <section id="how-matching-works" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
              Know which opportunities actually fit you.
            </h2>
            <p className="mt-3 text-ink-600">
              SkillMatch looks past keyword matching. It weighs your skills, education,
              experience, projects, and preferences against what an internship actually
              requires.
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 lg:flex-row lg:justify-center lg:gap-4">
            <Card className="w-full max-w-xs p-5 text-center lg:w-64">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Your profile
              </p>
              <p className="mt-2 text-sm text-ink-700">
                {solutionInputs.join(' \u00b7 ')}
              </p>
            </Card>
            <FlowArrow />
            <Card className="w-full max-w-xs border-primary-100 bg-primary-50 p-5 text-center lg:w-64">
              <p className="font-display text-sm font-semibold text-primary-700">
                SkillMatch
              </p>
              <p className="mt-2 text-sm text-primary-700/80">Compares fit</p>
            </Card>
            <FlowArrow />
            <Card className="w-full max-w-xs p-5 text-center lg:w-64">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Internship requirements
              </p>
              <p className="mt-2 text-sm text-ink-700">What the role needs</p>
            </Card>
            <FlowArrow />
            <Card className="w-full max-w-xs p-5 text-center lg:w-64">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                Match score &amp; skill gaps
              </p>
              <p className="mt-2 text-sm text-ink-700">Where you stand, and why</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. Matching experience */}
      <section className="border-t border-border bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
                Your skills. Their requirements. One clear match.
              </h2>
              <p className="mt-3 max-w-md text-ink-600">
                Every internship is scored against your actual profile, so you can see at
                a glance whether it&apos;s worth your time to apply.
              </p>
            </div>

            <Card className="p-6">
              <CardContent className="flex flex-col gap-5 p-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm font-semibold text-ink-900">
                      Frontend Developer Intern
                    </p>
                    <p className="text-sm text-ink-600">92% Match</p>
                  </div>
                  <MatchRing value={92} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                      Matched skills
                    </p>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {['React', 'TypeScript', 'Git', 'HTML/CSS'].map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center gap-2 text-sm text-ink-700"
                        >
                          <span className="text-success-600">&#10003;</span> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                      Skills to improve
                    </p>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {['Next.js', 'REST APIs'].map((skill) => (
                        <li
                          key={skill}
                          className="flex items-center gap-2 text-sm text-ink-700"
                        >
                          <span className="text-warning-600">&#9888;</span> {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Match score showcase */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
              See why you&apos;re a match.
            </h2>
            <p className="mt-3 text-ink-600">
              SkillMatch doesn&apos;t stop at a percentage &mdash; it shows the reasoning
              behind every match, so you understand exactly where you stand.
            </p>
          </div>

          <Card className="mx-auto mt-10 max-w-2xl p-8">
            <CardContent className="flex flex-col items-center gap-8 p-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-6">
                <MatchRing value={92} size={96} />
                <div>
                  <p className="font-display text-lg font-semibold text-ink-900">
                    Excellent Match
                  </p>
                  <dl className="mt-3 grid grid-cols-1 gap-1 text-sm text-ink-600">
                    <div className="flex gap-1.5">
                      <dt className="font-medium text-ink-900">Skills matched:</dt>
                      <dd>8</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-medium text-ink-900">Skills to improve:</dt>
                      <dd>2</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-medium text-ink-900">Profile alignment:</dt>
                      <dd>High</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Git', 'SQL'].map((skill) => (
                    <Badge key={skill} tone="success">
                      &#10003; {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'REST APIs'].map((skill) => (
                    <Badge key={skill} tone="warning">
                      &#9888; {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. Skill gap analysis */}
      <section className="border-t border-border bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
                Know what to improve before you apply.
              </h2>
              <p className="mt-3 max-w-md text-ink-600">
                SkillMatch identifies the skills an internship asks for that aren&apos;t
                yet on your profile &mdash; turning uncertainty into a clear next step.
              </p>
            </div>

            <Card className="p-6">
              <CardContent className="flex flex-col gap-5 p-0">
                <p className="text-sm text-ink-700">
                  You&apos;re a strong match for this internship.
                </p>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    You already have
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Git'].map((skill) => (
                      <Badge key={skill} tone="success">
                        &#10003; {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-400">
                    Consider improving
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Next.js', 'REST APIs'].map((skill) => (
                      <Badge key={skill} tone="warning">
                        &#9888; {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. Personalized recommendations */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display max-w-2xl text-2xl font-semibold text-ink-950 sm:text-3xl">
            Stop searching through internships that don&apos;t fit.
          </h2>
          <p className="mt-3 max-w-md text-ink-600">
            SkillMatch prioritizes opportunities based on your profile, so your feed leads
            with what fits you best.
          </p>

          <p className="mt-10 text-xs font-medium uppercase tracking-wide text-ink-400">
            Recommended for you
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <Card key={rec.role}>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-sm font-semibold text-ink-900">
                        {rec.role}
                      </p>
                      <p className="text-sm text-ink-600">{rec.company}</p>
                      <p className="mt-0.5 text-xs text-ink-400">{rec.location}</p>
                    </div>
                    <MatchRing value={rec.match} size={56} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.map((skill) => (
                      <Badge key={skill} tone="primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Student journey */}
      <section className="border-t border-border bg-surface-muted py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
            Your journey with SkillMatch
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((step) => (
              <div key={step.number}>
                <span className="font-display text-3xl font-semibold text-primary-600">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Student benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
            Built around your career journey.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent>
                  <benefit.icon className="text-primary-600" aria-hidden />
                  <h3 className="mt-4 font-display text-base font-semibold text-ink-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="border-t border-border bg-ink-950 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="font-display max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
            Your next internship could be a better match.
          </h2>
          <p className="max-w-md text-ink-400">
            Build your SkillMatch profile and discover opportunities that align with your
            skills and goals.
          </p>
          <Link to={primaryCta.to}>
            <Button size="lg">{primaryCta.label}</Button>
          </Link>
        </div>
      </section>
    </>
  )
}

function FlowArrow() {
  return (
    <span aria-hidden className="text-xl leading-none text-ink-400 lg:rotate-0 rotate-90">
      &rarr;
    </span>
  )
}
