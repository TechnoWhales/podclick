'use client'
import { useState } from 'react'
import Slider from 'react-slick'

import Image from 'next/image'

import { Filter, ImageType, ImageWithFilter } from '@/features/profile/addPhoto/types/Image'
import { Button, Icon, Typography } from '@/shared/components/ui'
import { PhotoSlider } from '@/shared/components/ui/photo-slider/PhotoSlider'

import s from '@/features/profile/addPhoto/ui/filters/Filters.module.scss'

type Props = {
  imagesArr: ImageType[]
}

export const Filters = ({imagesArr}: Props) => {
  const imagesWithFilter = imagesArr.map(item => {
    return {
      ...item,
      filter: 'normal' as Filter,
    }
  })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [images, setImages] = useState<ImageWithFilter[]>(imagesWithFilter)
  
  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  //   centerMode: true,
  //   centerPadding: "0",
  //   afterChange: (current: number) => {
  //     setCurrentSlide(current)
  //   },
  //   slickNext:
  // };


  const filters = [
    {filter: 'normal', name: 'Normal'},
    {filter: 'clarendon', name: 'Clarendon'},
    {filter: 'lark', name: 'Lark'},
    {filter: 'gingham', name: 'Gingham'},
    {filter: 'moon', name: 'Moon'},
    {filter: 'gingham', name: 'Gingham'},
    {filter: 'gingham', name: 'Gingham'},
    {filter: 'moon', name: 'Moon'},
    {filter: 'gingham', name: 'Gingham'},
  ]

  // const ConditionalWrapper = images.length > 1 ? Slider : 'div'
  // const sliderProps = images.length > 1 ? settings : {}


  const setFilterHandler = (index: number ,filter: Filter) => {
    const newFilter = images.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          filter,
        }
      }

      return item
    })

    return setImages(newFilter)
  }

  return <div className={s.filters}>
    <div className={s.title}>
      <div className={s.arrowBack}>
        <Icon iconId={'arrowIosBack'} />
      </div>
      <Typography variant={'h1'}>Filters</Typography>
      <Button className={s.nextBtn} variant={'link'}>
        <Typography variant={'h3'} as={'h3'}>
          Next
        </Typography>
      </Button>
    </div>
    <div className={s.filtersPanelWrapper}>
      {/*<ConditionalWrapper {...sliderProps} className={s.slider}>*/}
      {/*  {images.map((item) => {*/}

      {/*    return (*/}
      {/*      <div key={item.id} className={s.sliderItem} >*/}
      {/*      <Image className={s[item.filter]} src={item.img} alt={'Empty photo'} width={item.currentWidthImage} height={item.currentHeightImage} />*/}
      {/*    </div>*/}
      {/*    )*/}
      {/*  })}*/}
      {/*</ConditionalWrapper>*/}
      <PhotoSlider onAfterChange={(i) => setCurrentSlide(i)}>
        {images.map((item) => {

          return (
            <div key={item.id} className={s.sliderItem} >
              <Image className={s[item.filter]} src={item.img} alt={'Empty photo'} width={item.currentWidthImage} height={item.currentHeightImage} />
            </div>
          )
        })}
      </PhotoSlider>

      <div className={s.filtersContainer}>
        {filters.map((item, i) => {
          const filter = item.filter as Filter

          return (
            <div key={i} className={s.filterWrapper}>
              <Button className={s.filterBtn} variant={'icon'} onClick={() => setFilterHandler(currentSlide,item.filter as Filter)}><Image className={s[filter]} src={"/filter-sample.png"} alt={`${item.name} filter`} width={108} height={108} /></Button>
              <Typography variant={'regular_text_16'}>{item.name}</Typography>
            </div>
          )
        })}

      </div>
    </div>
  </div>
}