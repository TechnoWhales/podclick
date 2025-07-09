'use client'
import { useState } from 'react'
import Slider from 'react-slick'

import Image from 'next/image'

import { Button, Icon, Typography } from '@/shared/components/ui'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import s from '@/features/profile/addPhoto/ui/filters/Filters.module.scss'

type Filter = 'normal' | 'clarendon' | 'lark' | 'gingham' | 'moon'

type Props = {}

export const Filters = ({}: Props) => {
  const [currentFilter, setCurrentFilter] = useState<Filter>('normal')
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

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
      <Slider {...settings} className={s.slider}>
        <div>1</div>
        <div>2</div>
      </Slider>
      <div className={s.filtersContainer}>
        {filters.map((item, i) => {
          const filter = item.filter as Filter

          return (
            <div key={i} className={s.filterWrapper}>
              <Button className={s.filterBtn} variant={'icon'} onClick={() => setCurrentFilter(item.filter as Filter)}><Image className={s[filter]} src={"/filter-sample.png"} alt={`${item.name} filter`} width={108} height={108} /></Button>
              <Typography variant={'regular_text_16'}>{item.name}</Typography>
            </div>
          )
        })}

      </div>
    </div>
  </div>
}