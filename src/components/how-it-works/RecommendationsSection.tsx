import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'

const recommendations = [
  {
    title: 'Frontend Developer Intern',
    company: 'Northline Analytics',
    match: 92,
    skills: ['React', 'TypeScript', 'Git'],
    location: 'Remote',
  },
  {
    title: 'UI/UX Developer Intern',
    company: 'Fieldstone Studio',
    match: 86,
    skills: ['Figma', 'React', 'Design Systems'],
    location: 'Hybrid',
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Corriente Labs',
    match: 81,
    skills: ['React', 'SQL', 'Node.js'],
    location: 'On-site',
  },
]

export function RecommendationsSection() {
  return (
    <section
      id="recommendations"
      className="mx-auto max-w-7xl scroll-mt-[140px] px-6 py-20"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Recommendations"
          title="Find Opportunities That Fit You"
          subtitle="Recommendations are ranked from your profile and skills, so the internships you see are the ones most worth your time. (Example data shown here for illustration.)"
        />
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((role, index) => (
          <Reveal key={role.title} delay={index * 80}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex h-full flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-semibold text-ink-900">
                      {role.title}
                    </p>
                    <p className="mt-1 text-sm text-ink-600">{role.company}</p>
                  </div>
                  <MatchRing value={role.match} size={52} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <Badge key={skill} tone="neutral">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <p className="mt-auto text-xs text-ink-500">{role.location}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <NextSectionLink targetId="students-companies" label="Students & Companies" />
    </section>
  )
}
