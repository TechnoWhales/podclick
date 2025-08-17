'use client'

import { useState } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'

import { Button, Typography } from '@/shared/components/ui'

import s from './ExpandableText.module.scss'

type Props = {
  text: string
  className?: string
  maxLine?: number
  isExpanded: boolean
  setIsExpanded: (isExpanded: boolean) => void
}

export const ExpandableText = ({
  text,
  className,
  maxLine = 3,
  setIsExpanded,
  isExpanded,
}: Props) => {
  const tCommon = useTranslations('common')
  const [isClamped, setIsClamped] = useState(false)

  return (
    <div className={clsx(s.expandableText, s.wrapper, className)}>
      {isExpanded ? (
        <>
          <Typography as={'p'} variant={'regular_text_14'}>
            {text}
          </Typography>
          <Button variant={'link'} className={s.inlineButton} onClick={() => setIsExpanded(false)}>
            <Typography as={'span'} variant={'regular_link'}>
              {tCommon('button.hide')}
            </Typography>
          </Button>
        </>
      ) : (
        <LinesEllipsis
          text={text}
          maxLine={maxLine}
          ellipsis={
            <>
              ...&nbsp;
              <Button
                variant={'link'}
                className={s.inlineButton}
                onClick={e => {
                  e.stopPropagation()
                  setIsExpanded(true)
                }}
              >
                <Typography as={'span'} variant={'regular_link'}>
                  {tCommon('button.showMore')}
                </Typography>
              </Button>
            </>
          }
          onReflow={({ clamped }) => setIsClamped(clamped)}
          component={'p'}
          className={s.text}
          trimRight
          win={window}
        />
      )}
    </div>
  )
}
