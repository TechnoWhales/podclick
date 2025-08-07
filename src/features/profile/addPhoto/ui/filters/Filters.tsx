'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { FiltersType, ImageType, PageType } from '@/features/profile/addPhoto/types/Image'
import { TitlePhotoPages } from '@/features/profile/addPhoto/ui/title/Title'
import { applyCssFilterToImage } from '@/features/profile/addPhoto/utils/saveFilteredImage'
import { Button, Typography } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import s from '@/features/profile/addPhoto/ui/filters/Filters.module.scss'

type Props = {
  images: ImageType[]
  currentImage: number
  nextBtnAction: (images: ImageType[], pageName: PageType) => void
  backBtnAction: () => void
  setImageAction: (image: ImageType[]) => void
  setCurrentImageAction: (index: number) => void
}


export const Filters = ({
  images,
  nextBtnAction,
  backBtnAction,
  setImageAction,
  currentImage,
  setCurrentImageAction,
}: Props) => {
  const t = useTranslations('addPost.filters')

  const setFilterHandler = (index: number, filter: FiltersType) => {
    const newFilter = images.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          currentFilter: filter,
        }
      }

      return item
    })

    setImageAction(newFilter)
  }

  const nextBtnHandler = async () => {
    const filteredImg = await Promise.all(
      images.map(async item => {
        if (!item.croppedImg || !item.currentFilter?.value) {
          return { ...item, filteredImg: item.croppedImg }
        }

        const filteredImg = await applyCssFilterToImage(item.croppedImg, item.currentFilter.value)

        if (typeof filteredImg !== 'string') {
          return { ...item, filteredImg: item.croppedImg }
        }

        return {
          ...item,
          filteredImg,
        }
      })
    )

    nextBtnAction(filteredImg, 'publication')
  }

  return (
    <div className={s.filters}>
      {
        <TitlePhotoPages nextBtnAction={nextBtnHandler} backBtnAction={backBtnAction}>
          {t('title')}
        </TitlePhotoPages>
      }
      <div className={s.filtersPanelWrapper}>
        <PhotoSlider
          currentSlide={currentImage}
          setCurrentSlide={i => setCurrentImageAction(i)}
          onAfterChange={i => setCurrentImageAction(i)}
        >
          {images.map(item => {
            if (!item.croppedImg) {
              return
            }

            return (
              <div key={item.id} className={s.sliderItem}>
                <Image
                  className={s[item.currentFilter?.filter || '']}
                  src={item.croppedImg}
                  alt={'Empty photo'}
                  width={item.currentWidthImage}
                  height={item.currentHeightImage}
                />
              </div>
            )
          })}
        </PhotoSlider>

        <div className={s.filtersContainer}>
          {filters.map((item, i) => {
            return (
              <div key={i} className={s.filterWrapper}>
                <Button
                  className={s.filterBtn}
                  variant={'icon'}
                  onClick={() => setFilterHandler(currentImage, item)}
                >
                  <Image
                    className={s[item.filter]}
                    src={'/filter-sample.png'}
                    alt={`${item.name} filter`}
                    width={108}
                    height={108}
                  />
                </Button>
                <Typography variant={'regular_text_16'}>{t(item.filter)}</Typography>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


const filters: FiltersType[] = [
  { filter: 'normal', name: 'Normal', value: null },
  {
    filter: 'clarendon',
    name: 'Clarendon',
    value: 'contrast(1.2) saturate(1.35) brightness(1.1) hue-rotate(-10deg)',
  },
  { filter: 'lark', name: 'Lark', value: 'saturate(1.5) brightness(1.15) contrast(1.1)' },
  {
    filter: 'gingham',
    name: 'Gingham',
    value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)',
  },
  { filter: 'moon', name: 'Moon', value: 'grayscale(1) brightness(1.2) contrast(1.1)' },
  {
    filter: 'gingham',
    name: 'Gingham',
    value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)',
  },
  {
    filter: 'gingham',
    name: 'Gingham',
    value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)',
  },
  { filter: 'moon', name: 'Moon', value: 'grayscale(1) brightness(1.2) contrast(1.1)' },
  {
    filter: 'gingham',
    name: 'Gingham',
    value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)',
  },
]
