import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MatchRing } from '@/components/ui/MatchRing'
import { SectionHeading } from '@/components/how-it-works/SectionHeading'
import { Reveal } from '@/components/how-it-works/Reveal'
import { NextSectionLink } from '@/components/how-it-works/NextSectionLink'

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

export function RecommendationsSection() {
  return (
    <section
      id="recommendations"
      className="mx-auto max-w-7xl scroll-mt-[140px] px-6 py-20"
    >
      <Reveal>
        <SectionHeading
          eyebrow="Recommendations"
          title="Stop searching through internships that don't fit."
          subtitle="SkillMatch prioritizes opportunities based on your profile, so your feed leads with what fits you best."
        />
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec, index) => (
          <Reveal key={rec.role} delay={index * 80}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex h-full flex-col gap-4">
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
                <div className="mt-auto flex flex-wrap gap-2">
                  {rec.skills.map((skill) => (
                    <Badge key={skill} tone="primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <NextSectionLink targetId="your-journey" label="Your Journey" />
    </section>
  )
}
