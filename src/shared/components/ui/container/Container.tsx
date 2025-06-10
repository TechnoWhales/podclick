import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  width: number
  padding?: string
  className?: string
}

export const Container = ({ children, padding, width, className }: Props) => {
  const styles = {
    maxWidth: `${width}px`,
    width: '100%',
    margin: '0 auto',
    padding: padding || '0',
  }

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  )
}
