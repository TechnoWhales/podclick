import { nanoid } from '@reduxjs/toolkit'
import clsx from 'clsx'
import Image from 'next/image'

import { ImageType, Mode, RationModeType } from '@/features/profile/addPhoto/types/Image'
import { Button } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload.module.scss'

type Props = {
  setImage: (img: ImageType) => void
  nextBtn: () => void
}

export const InitialPhotoUpload = ({setImage, nextBtn}: Props) => {
  const {UploadButton} = useUploadFile({typeFile: 'image', onUpload: ({base64}) => {
      if (!base64) {return}

      const photo: ImageType = {
        id: nanoid(),
        img: base64,
        croppedImg: null,
        filteredImg: null,
        currentFilter: null,
        currentHeightImage: 0,
        currentWidthImage: 0,
        crop: { x: 0, y: 0 },
        ration: 'original' as RationModeType,
        zoom: 1,
        minZoom: 1,
        originalWidthImage: 0,
        originalHeightImage: 0,
        croppedAreaPixels: { height: 0, width: 0, x: 0, y: 0 },
      }

      setImage(photo)
      nextBtn()
    }})
  
  return <div>
    <div className={clsx(s.addPhotoWrapper)}>
      <Image
        className={clsx(s.photoImg)}
        src={'/empty-photo.svg'}
        alt={'Empty photo'}
        width={222}
        height={228}
      />
      <UploadButton className={s.selectBtn}>Select from Computer</UploadButton>
        <Button className={s.draftBtn} variant={'outlined'}>
          Open Draft
        </Button>
    </div>
  </div>
}