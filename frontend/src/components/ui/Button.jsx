export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled,
  ...rest
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
  }

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn ${variants[variant] ?? variants.primary} ${sizes[size] ?? ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}
