'use client'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Avatar, Typography, Button, Icon } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants'
import { PublicUser } from '@/shared/types'

import s from './ProfileGeneralInfo.module.scss'

type Props = {
  isOwner: boolean
} & PublicUser

export const ProfileGeneralInfo = ({
  userName,
  aboutMe,
  avatars,
  userMetadata,
  hasPaymentSubscription,
  isOwner,
}: Props) => {
  const t = useTranslations('profile')

  return (
    <section className={s.hero}>
      <div className={s.gridContainer}>
        <div className={s.gridItem1}>
          {/*TODO: размер аватара - с сервера пришло 192х192 */}
          <Avatar
            url={avatars.length > 0 ? avatars[0].url : undefined}
            title={userName}
            size={204}
          />
        </div>
        <div className={s.gridItem2}>
          <Typography variant={'h1'} as={'h1'} className={s.headingResponsive}>
            {userName}
          </Typography>
          {hasPaymentSubscription && <Icon iconId={'paid'} />}
        </div>
        {isOwner && (
          <div className={s.gridItem3}>
            <Link href={ROUTES.PROFILE.SETTINGS} passHref legacyBehavior>
              <Button variant={'secondary'} as={'a'}>
                {t('button.profileSettings')}
              </Button>
            </Link>
          </div>
        )}
        <div className={s.gridItem4}>
          <div className={s.stats}>
            <div>
              <Typography variant={'bold_text_14'} className={clsx(s.textResponsive, s.fw600)}>
                {userMetadata.following ? userMetadata.following : 0}
              </Typography>
              <Typography className={s.textResponsive}>{t('summary.following')}</Typography>
            </div>
            <div>
              <Typography variant={'bold_text_14'} className={clsx(s.textResponsive, s.fw600)}>
                {userMetadata.followers ? userMetadata.followers : 0}
              </Typography>
              <Typography className={s.textResponsive}>{t('summary.followers')}</Typography>
            </div>
            <div>
              <Typography variant={'bold_text_14'} className={clsx(s.textResponsive, s.fw600)}>
                {userMetadata.publications ? userMetadata.publications : 0}
              </Typography>
              <Typography className={s.textResponsive}>{t('summary.publications')}</Typography>
            </div>
          </div>
        </div>
        <div className={s.gridItem5}>
          <Typography variant={'regular_text_16'} className={s.aboutMe}>
            {aboutMe}
          </Typography>
        </div>
      </div>
    </section>
  )
}
