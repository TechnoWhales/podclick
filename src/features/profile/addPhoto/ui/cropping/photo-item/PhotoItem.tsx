import Image from 'next/image'

import { PhotoType } from '@/features/profile/addPhoto/ui/cropping/Cropping'
import { Button, Icon } from '@/shared/components/ui'

import s from '@/features/profile/addPhoto/ui/cropping/Cropping.module.scss'

type PhotoItemProps = {
  onClick: () =>  void
  removePhoto: (id: string) => void
  photo: PhotoType
}

export const PhotoItem = ({onClick, removePhoto, photo}: PhotoItemProps) => {
  const {img, id} = photo

  return (
    <div className={s.photoItemWrapper}>
      <Button className={s.removePhoto} variant={"icon"} onClick={() => removePhoto(id)}>
        <Icon iconId={'close'} />
      </Button>
      <Image src={img} alt={'Empty photo'} width={82} height={82} onClick={onClick}/>
    </div>
  )
}