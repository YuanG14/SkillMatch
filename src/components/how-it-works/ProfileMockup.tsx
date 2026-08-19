import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { UserIcon } from '@/components/ui/icons'

const skills = ['React', 'TypeScript', 'SQL', 'Git']
const projects = ['SkillMatch', 'DataLens']

export function ProfileMockup() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700">
            <UserIcon width={18} height={18} />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900">
              Computer Science Student
            </p>
            <p className="text-xs text-ink-600">Profile 80% complete</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            Skills
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} tone="primary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
            Projects
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {projects.map((project) => (
              <Badge key={project} tone="neutral">
                {project}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
