import clsx from 'clsx'
import Image from 'next/image'

import { ImageType } from '@/features/profile/addPhoto/types/Image'
import { createImage } from '@/features/profile/addPhoto/utils/createImage'
import { Button } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload.module.scss'

type Props = {
  setImage: (img: ImageType) => void
  nextBtn: () => void
}

export const InitialPhotoUpload = ({setImage, nextBtn}: Props) => {
  const {UploadButton} = useUploadFile({typeFile: 'image', onUpload: ({base64: img}) => {
      if (!img) {return}
      
      const image = createImage(img)

      setImage(image)
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