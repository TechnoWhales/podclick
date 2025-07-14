import { useState } from 'react'

import Image from 'next/image'

import { ImageType } from '@/features/profile/addPhoto/types/Image'
import { TitlePhotoPages } from '@/features/profile/addPhoto/ui/title/Title'
import { TextField } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import s from '@/features/profile/addPhoto/ui/publication/Publication.module.scss'

type Props = {
  imagesArr: ImageType[]
  backBtn: () => void
}

export const Publication = ({imagesArr, backBtn}: Props) => {
  const [publicationText, setPublicationText] = useState('')
  const profileName = 'URLProfile'

  const nextBtnHandler = () => {}

  return <div>
    {<TitlePhotoPages nextBtn={nextBtnHandler} textNextBtn={'Publish'} backBtn={backBtn}>Publication</TitlePhotoPages>}
    <div className={s.publicationWrapper}>
      <PhotoSlider>
        {imagesArr.map((item) => {
          if (!item.filteredImg) {return}

          return (
            <div key={item.id} className={s.sliderItem} >
              <Image src={item.filteredImg} alt={'Empty photo'} width={item.currentWidthImage} height={item.currentHeightImage} />
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
      </div>
    </div>
  </div>
}