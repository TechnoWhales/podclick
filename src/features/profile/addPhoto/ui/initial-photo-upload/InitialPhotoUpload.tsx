import clsx from 'clsx'
import Image from 'next/image'

import { Mode } from '@/features/profile/addPhoto/types/Image'
import { Button } from '@/shared/components/ui'
import { useUploadFile } from '@/shared/hooks/useUploadFile'

import s from '@/features/profile/addPhoto/ui/initial-photo-upload/InitialPhotoUpload.module.scss'

type Props = {
  setImgPreview: (img: string) => void
  setMode: (mode: Mode) => void
}

export const InitialPhotoUpload = ({setImgPreview, setMode}: Props) => {
  const {UploadButton} = useUploadFile({typeFile: 'image', onUpload: ({base64}) => {
      if (!base64) {return}

      setImgPreview(base64)
      setMode('cropping')
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