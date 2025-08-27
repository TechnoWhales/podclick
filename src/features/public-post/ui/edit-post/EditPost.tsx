'use client'

import { useState } from 'react'

import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'

import { useChangePostDescriptionMutation } from '@/features/public-post/api/publicPostApi'
import { Button, TextField, Typography } from '@/shared/components/ui'
import { handleError } from '@/shared/utils/handleError'

import s from './EditPost.module.scss'

type Props = {
  postId: number
  initDescription: string
  handleCloseAction: () => void
}

export const EditPost = ({ postId, initDescription, handleCloseAction }: Props) => {
  const [isDisable, setIsDisable] = useState(false)
  const [description, setDescription] = useState(initDescription)
  const t = useTranslations('addPost.publication')
  const [changePostDescription] = useChangePostDescriptionMutation()

  const setDescriptionHandler = (text: string) => {
    if (text.length > 500) {
      return
    }
    setDescription(text)
  }

  const changePostDescriptionHandler = async () => {
    try {
      setIsDisable(true)
      await changePostDescription({ description, postId })
    } catch (e) {
      handleError(e)
    } finally {
      setIsDisable(false)
      handleCloseAction()
    }
  }

  return (
    <div className={s.EditPostWrapper}>
      <div className={s.textareaWrapper}>
        <TextField
          value={description}
          onChange={e => setDescriptionHandler(e.target.value)}
          label={t('descTitle')}
          placeholder={t('placeholder')}
          rows={5}
          multiline
          fullWidth
          margin={'12px 0 0'}
          disabled={isDisable}
        />
        <div className={s.textLengthWrapper}>
          <Typography variant={'small_text'} className={clsx(description.length >= 500 && s.error)}>
            {description.length}
          </Typography>
          <Typography variant={'small_text'}>/500</Typography>
        </div>
      </div>
      <Button className={s.saveBtn} disabled={isDisable} onClick={changePostDescriptionHandler}>
        Save Changes
      </Button>
    </div>
  )
}
