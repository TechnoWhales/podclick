'use client'
import { useState } from 'react'

import Image from 'next/image'

import { FiltersType, ImageType, ImageWithFilterType } from '@/features/profile/addPhoto/types/Image'
import { applyCssFilterToImage } from '@/features/profile/addPhoto/utils/saveFilteredImage'
import { Button, Icon, Typography } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import s from '@/features/profile/addPhoto/ui/filters/Filters.module.scss'

type Props = {
  images: ImageType[]
  nextBtn: (images: ImageType[]) => void
  backBtn: () => void
}

export const Filters = ({images, nextBtn, backBtn}: Props) => {
  const imagesWithFilter = images.map(item => {

    return {
      ...item,
      filter: item.currentFilter || {filter: 'normal', name: 'Normal', value: null} as FiltersType,
    }
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [localImages, setLocalImage] = useState<ImageWithFilterType[]>(imagesWithFilter)

  const filters: FiltersType[] = [
    {filter: 'normal', name: 'Normal', value: null},
    {filter: 'clarendon', name: 'Clarendon', value: 'contrast(1.2) saturate(1.35) brightness(1.1) hue-rotate(-10deg)'},
    {filter: 'lark', name: 'Lark', value: 'saturate(1.5) brightness(1.15) contrast(1.1)'},
    {filter: 'gingham', name: 'Gingham', value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)'},
    {filter: 'moon', name: 'Moon', value: "grayscale(1) brightness(1.2) contrast(1.1)"},
    {filter: 'gingham', name: 'Gingham', value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)'},
    {filter: 'gingham', name: 'Gingham', value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)'},
    {filter: 'moon', name: 'Moon', value: "grayscale(1) brightness(1.2) contrast(1.1)"},
    {filter: 'gingham', name: 'Gingham', value: 'sepia(0.2) saturate(0.85) contrast(0.9) brightness(1.05)'},
  ]

  const setFilterHandler = (index: number, filter: FiltersType) => {
    const newFilter = localImages.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          filter,
        }
      }

      return item
    })

    return setLocalImage(newFilter)
  }

  const nextBtnHandler = async () => {
    const filteredImg = await Promise.all(
      localImages.map(async item => {
        if (!item.croppedImg || !item.filter.value) {return item}

        const filteredImg = await applyCssFilterToImage(item.croppedImg, item.filter.value)

        if (typeof filteredImg !== "string") {return {...item, filteredImg: item.croppedImg, currentFilter: item.filter}}

        return {
          ...item,
          filteredImg,
          currentFilter: item.filter,
        }
      })
    )

    nextBtn(filteredImg)
  }

  return <div className={s.filters}>
    <div className={s.title}>
      <div className={s.arrowBack} onClick={backBtn}>
        <Icon iconId={'arrowIosBack'} />
      </div>
      <Typography variant={'h1'}>Filters</Typography>
      <Button className={s.nextBtn} variant={'link'} onClick={nextBtnHandler}>
        <Typography variant={'h3'} as={'h3'}>
          Next
        </Typography>
      </Button>
    </div>
    <div className={s.filtersPanelWrapper}>
      <PhotoSlider onAfterChange={(i) => setCurrentSlide(i)}>
        {localImages.map((item) => {
          if (!item.croppedImg) {return}

          return (
            <div key={item.id} className={s.sliderItem} >
              <Image className={s[item.filter.filter]} src={item.croppedImg} alt={'Empty photo'} width={item.currentWidthImage} height={item.currentHeightImage} />
            </div>
          )
        })}
      </PhotoSlider>

      <div className={s.filtersContainer}>
        {filters.map((item, i) => {
          return (
            <div key={i} className={s.filterWrapper}>
              <Button className={s.filterBtn} variant={'icon'} onClick={() => setFilterHandler(currentSlide,item)}><Image className={s[item.filter]} src={"/filter-sample.png"} alt={`${item.name} filter`} width={108} height={108} /></Button>
              <Typography variant={'regular_text_16'}>{item.name}</Typography>
            </div>
          )
        })}

      </div>
    </div>
  </div>
}