import { useState } from 'react'

import Image from 'next/image'

import { ImageType } from '@/features/profile/addPhoto/types/Image'
import { Button, Icon, TextField, Typography } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import s from '@/features/profile/addPhoto/ui/publication/Publication.module.scss'

type Props = {
  imagesArr: ImageType[]
}

export const Publication = ({imagesArr}: Props) => {
  const [publicationText, setPublicationText] = useState('')
  const profileName = 'URLProfile'

  return <div>
    <div className={s.title}>
      <div className={s.arrowBack}>
        <Icon iconId={'arrowIosBack'} />
      </div>
      <Typography variant={'h1'}>Publication</Typography>
      <Button className={s.nextBtn} variant={'link'}>
        <Typography variant={'h3'} as={'h3'}>
          Publish
        </Typography>
      </Button>
    </div>
    <div className={s.publicationWrapper}>
      <PhotoSlider>
        {imagesArr.map((item) => {

          return (
            <div key={item.id} className={s.sliderItem} >
              <Image src={item.img} alt={'Empty photo'} width={item.currentWidthImage} height={item.currentHeightImage} />
            </div>
          )
        })}
      </PhotoSlider>
      <div className={s.contentWrapper}>
        <div className={s.decrWrapper}>
          <div className={s.avatarWrapper}>
            <Image className={s.avatarImg} src={'./empty-photo.svg'} alt={'Avatar image'} width={36} height={36}/>
            {profileName}
          </div>
          <TextField value={publicationText} onChange={(e) => setPublicationText(e.currentTarget.value)} label={'Add publication descriptions'} placeholder={'Text-area'} rows={5} multiline fullWidth margin={'12px 0 0'}/>
        </div>
        <hr className={s.line}/>
        <div></div>
      </div>
    </div>
  </div>
}