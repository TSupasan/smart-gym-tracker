const iconVariants = {
  red: 'stat-card__icon--red',
  amber: 'stat-card__icon--amber',
  green: 'stat-card__icon--green',
}

export function StatCard({
  icon: Icon,
  iconVariant = 'red',
  label,
  value,
  hint,
  className = '',
}) {
  const iconClass = iconVariants[iconVariant] ?? iconVariants.red

  return (
    <div className={`glass-card glass-card--hover stat-card card-padding ${className}`.trim()}>
      <div className={`stat-card__icon ${iconClass}`}>
        <Icon size={22} aria-hidden />
      </div>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
      {hint != null && hint !== '' ? (
        <p className="stat-card__hint">{hint}</p>
      ) : null}
    </div>
  )
}
