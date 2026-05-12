import { ChevronRight, Clock } from 'lucide-react'

/**
 * Session row — compact list item (dashboard) or history row (interactive).
 */
export function WorkoutCard({
  variant = 'compact',
  title,
  subtitle,
  tag,
  duration,
  volume,
  date,
  onClick,
}) {
  if (variant === 'history') {
    return (
      <button
        type="button"
        className="workout-card workout-card--history history-row"
        onClick={onClick}
      >
        <div className="history-row__main">
          <p className="history-row__title">{title}</p>
          <p className="history-row__meta">
            <Clock size={16} aria-hidden />
            {duration}
            <span className="history-row__dot" aria-hidden />
            {volume}
          </p>
        </div>
        <div className="history-row__side">
          <span className="history-row__date">{date}</span>
          <ChevronRight size={18} aria-hidden />
        </div>
      </button>
    )
  }

  return (
    <div className="workout-card workout-card--compact today-list__item">
      <div>
        <p className="workout-card__title today-list__name">{title}</p>
        {subtitle ? (
          <p className="workout-card__subtitle today-list__detail">{subtitle}</p>
        ) : null}
      </div>
      {tag ? <span className="today-list__tag">{tag}</span> : null}
    </div>
  )
}
