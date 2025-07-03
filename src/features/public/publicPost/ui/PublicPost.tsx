'use client'
import s from './PublicPost.module.scss'
import Image from 'next/image'
import {Typography} from '@/shared/components/ui';

type Props = {}

export const PublicPost = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div className={s.publicPost}>
                <div>
                    PhotoSlider
                </div>
                <div className={s.publicPostArticle}>
                    <div className={s.publicPostArticleHeader}>
                        <Image src={''} alt={'avatar'} className={s.publicPostUserAvatar} />
                        <Typography variant={'h3'}>{'zjhcbsd,cjk'}</Typography>
                    </div>
                </div>
            </div>
        </div>

    )
}