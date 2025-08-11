'use client'

import { useRef, useState, useLayoutEffect } from 'react'

import clsx from 'clsx'

import { Button, Typography } from '@/shared/components/ui'

import s from './ExpandableText.module.scss'

type Props = {
  text: string
  className?: string
}

export const ExpandableText = ({ text, className }: Props) => {
  const textRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useLayoutEffect(() => {
    const el = textRef.current

    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight || '0')
      const maxHeight = lineHeight * 3

      setIsOverflowing(el.scrollHeight > maxHeight)
    }
  }, [text])

  return (
    <div className={clsx(s.wrapper, className)}>
      <div
        ref={textRef}
        className={clsx(s.text, {
          [s.clamped]: !isExpanded && isOverflowing,
        })}
      >
        <Typography as={'p'} variant={'regular_text_14'}>
          {text}
        </Typography>
      </div>

      {isOverflowing && (
        <Button
          variant={'link'}
          className={s.inlineButton}
          onClick={() => setIsExpanded(prev => !prev)}
        >
          <Typography as={'span'} variant={'regular_link'}>
            {isExpanded ? 'Hide' : 'Show more'}
          </Typography>
        </Button>
      )}
    </div>
  )
}
