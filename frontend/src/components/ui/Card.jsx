export function Card({
  children,
  className = '',
  padding = 'default',
  hover = true,
  ...rest
}) {
  const pad =
    padding === 'none'
      ? ''
      : padding === 'sm'
        ? 'card-padding-sm'
        : 'card-padding'

  return (
    <div
      className={`glass-card ${hover ? 'glass-card--hover' : ''} ${pad} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  )
}
