import type { ElementType, ReactNode } from 'react'
import './card.css'

type CardProps = {
  as?: ElementType
  title?: string
  description?: string
  children?: ReactNode
  className?: string
}

export function Card({
  as: Component = 'article',
  title,
  description,
  children,
  className,
}: CardProps) {
  const composedClassName = ['card', className].filter(Boolean).join(' ')

  return (
    <Component className={composedClassName}>
      {(title || description) && (
        <div className="card__header">
          {title ? <h3 className="card__title">{title}</h3> : null}
          {description ? <p className="card__description">{description}</p> : null}
        </div>
      )}
      {children}
    </Component>
  )
}
