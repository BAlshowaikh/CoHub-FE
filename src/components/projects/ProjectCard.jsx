

const pickCardTone = (project, idx) => {
  // simple rotating palette
  const tones = ["tone-purple", "tone-cream", "tone-cyan"]
  return tones[idx % tones.length]
}

const formatDate = (value) => {
  if (!value) return ""
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })
}

const calcDaysLeftLabel = (deadline) => {
  if (!deadline) return "No deadline"

  const end = new Date(deadline)
  if (Number.isNaN(end.getTime())) return "No deadline"

  const now = new Date()
  // normalize times to midnight to avoid off-by-1 due to time of day
  end.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)

  const diffMs = end.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return "Overdue"
  if (diffDays === 0) return "Due today"
  if (diffDays === 1) return "1 day left"
  return `${diffDays} days left`
}

const getToneByStatus = (status) => {
  const s = String(status || "").toLowerCase()

  // match your enum values: completed, pending, On progress
  if (s === "completed") return "tone-cyan"
  if (s === "on progress" || s === "onprogress" || s === "in progress") return "tone-cream"
  return "tone-purple" // pending (default)
}

const ProjectCard = ({ project, canEdit, onEdit, onOpenKanban }) => {
  const name = project?.name || "Untitled"
  const status = project?.status || "pending"

  // Date shown at top: prefer deadline, otherwise createdAt
  const dateToShow = project?.deadline || project?.createdAt
  const dateLabel = formatDate(dateToShow) || " "

  // FE computed pill based on deadline
  const daysLeftLabel = calcDaysLeftLabel(project?.deadline)

  return (
    <div className={`project-card ${getToneByStatus(status)}`} onClick={onOpenKanban}>
      <div className="project-card__top">
        <div className="project-card__date">{dateLabel}</div>

        {canEdit ? (
          <button
            type="button"
            className="project-card__edit"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onEdit?.()
            }}
            title="Edit project"
          >
            
          </button>
        ) : null}
      </div>

      <div className="project-card__body">
        <div className="project-card__name">{name}</div>
        <div className="project-card__status">{status}</div>
      </div>

      <div className="project-card__footer">
        <span className="project-card__pill">{daysLeftLabel}</span>
      </div>
    </div>
  )
}

export default ProjectCard