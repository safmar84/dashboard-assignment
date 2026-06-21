import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import './button.css'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'sm'

type ButtonBaseProps = {
  children: ReactNode
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
}

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never
  }

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<LinkProps, 'className' | 'children'> & {
    to: LinkProps['to']
  }

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

function isLinkButton(props: ButtonProps): props is ButtonAsLinkProps {
  return 'to' in props && props.to !== undefined
}

function getClassName({
  className,
  size = 'md',
  variant = 'primary',
}: Pick<ButtonBaseProps, 'className' | 'size' | 'variant'>) {
  return ['button', `button--${variant}`, `button--${size}`, className]
    .filter(Boolean)
    .join(' ')
}

export function Button(props: ButtonProps) {
  const { children, className, size = 'md', variant = 'primary' } = props
  const composedClassName = getClassName({ className, size, variant })

  if (isLinkButton(props)) {
    const { to, ...linkProps } = props

    return (
      <Link className={composedClassName} to={to} {...linkProps}>
        {children}
      </Link>
    )
  }

  const { type = 'button', ...buttonProps } = props

  return (
    <button className={composedClassName} type={type} {...buttonProps}>
      {children}
    </button>
  )
}
