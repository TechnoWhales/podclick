'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'

import clsx from 'clsx'

import { Button, Icon } from '@/shared/components/ui'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from './PhotoSlider.module.scss'

type Props = {
  children?: ReactNode
  currentSlide?: number
  className?: string
  onAfterChange?: (index: number) => void
  setCurrentSlide?: (index: number) => void
} & Settings

export const PhotoSlider = ({
  children,
  className,
  onAfterChange,
  currentSlide,
  setCurrentSlide,
  ...rest
}: Props) => {
  const sliderRef = useRef<Slider>(null)
  // const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (currentSlide != null) {
      sliderRef.current?.slickGoTo(currentSlide)
      setCurrentSlide?.(currentSlide)
    }
  }, [currentSlide])

  const settings = {
    dots: true,
    dotsClass: s.dots,
    customPaging: (i: number) => (
      <button className={clsx(s.dot, currentSlide === i && s.active)} type={'button'} />
    ),
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: '0',
    afterChange: (current: number) => {
      onAfterChange?.(current)
      setCurrentSlide?.(current)
    },
    nextArrow: <Arrows typeBtn={'next'} />,
    prevArrow: <Arrows typeBtn={'prev'} />,
    ...rest,
  }

  return (
    <Slider ref={sliderRef} className={clsx(s.slider, className && className)} {...settings}>
      {children}
    </Slider>
  )
}

type ArrowProps = { style?: CSSProperties; onClick?: () => void; typeBtn: 'prev' | 'next' }

function Arrows({ style, onClick, typeBtn }: ArrowProps) {
  return (
    <Button
      className={clsx(
        s.sliderBtn,
        typeBtn === 'next' && s.nextBtn,
        typeBtn === 'prev' && s.prevBtn
      )}
      style={{ ...style }}
      variant={'icon'}
      onClick={onClick}
    >
      <Icon
        iconId={typeBtn === 'next' ? 'arrowIosForward' : 'arrowIosBackOutline'}
        width={'48px'}
        height={'48px'}
      />
    </Button>
  )
}
