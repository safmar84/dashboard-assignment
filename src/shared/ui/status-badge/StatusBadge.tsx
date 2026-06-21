import './status-badge.css'

export type StatusTone = 'active' | 'expired' | 'removed' | 'blocked' | 'neutral'

type StatusBadgeProps = {
  label: string
  tone?: StatusTone
}

function normalizeTone(label: string): StatusTone {
  switch (label.toLowerCase()) {
    case 'active':
      return 'active'
    case 'expired':
      return 'expired'
    case 'removed':
      return 'removed'
    case 'blocked':
      return 'blocked'
    default:
      return 'neutral'
  }
}

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  const resolvedTone = tone ?? normalizeTone(label)

  return (
    <span className={`status-badge status-badge--${resolvedTone}`}>
      {label}
    </span>
  )
}
