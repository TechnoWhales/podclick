'use client'

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'

import clsx from 'clsx'

import { Button, Icon } from '@/shared/components/ui'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from './PhotoSlider.module.scss'

type Size = 'sm' | 'md' | 'lg'

type Props = {
  children?: ReactNode
  currentSlide?: number
  className?: string
  onAfterChange?: (index: number) => void
  setCurrentSlide?: (index: number) => void
  size?: Size
  totalCountSlider?: number
} & Settings

export const PhotoSlider = ({
  children,
  className,
  onAfterChange,
  currentSlide,
  setCurrentSlide,
  size = 'md',
  totalCountSlider,
  ...rest
}: Props) => {
  const [defaultCurrentSlide, setDefaultCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)

  let hideNext = false
  let hidePrev = false

  if (totalCountSlider) {
    hideNext = (totalCountSlider - 1) === defaultCurrentSlide
    hidePrev = (currentSlide === 0 || defaultCurrentSlide === 0 )
  }

  useEffect(() => {
    if (currentSlide != null) {
      sliderRef.current?.slickGoTo(currentSlide)
      setCurrentSlide?.(currentSlide)
    } else {
      sliderRef.current?.slickGoTo(defaultCurrentSlide)
    }
  }, [currentSlide])



  const settings = {
    dots: true,
    dotsClass: s.dots,
    customPaging: (i: number) => (
      <button className={clsx(s.dot, (currentSlide === i || defaultCurrentSlide === i) && s.active)} type={'button'} />
    ),
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    arrows: true,
    centerMode: true,
    centerPadding: '0',
    afterChange: (current: number) => {
      if (onAfterChange && setCurrentSlide) {
        onAfterChange?.(current)
        setCurrentSlide?.(current)
      } else {
        setDefaultCurrentSlide(current)
      }

    },
    nextArrow: <Arrows typeBtn={'next'} size={size} hideArrow={hideNext}/>,
    prevArrow: <Arrows typeBtn={'prev'} size={size} hideArrow={hidePrev}/>,
    ...rest,
  }


  return (
    <Slider ref={sliderRef} className={clsx(s.slider, s[size], className && className)} {...settings}>
      {children}
    </Slider>
  )
}

type ArrowProps = {
  style?: CSSProperties;
  onClick?: () => void;
  typeBtn: 'prev' | 'next'
  size: Size
  hideArrow?: boolean
}

function Arrows({ style, onClick, typeBtn, size, hideArrow = false }: ArrowProps) {
  return (
    <Button
      className={clsx(
        s.sliderBtn,
        typeBtn === 'next' && s.nextBtn,
        typeBtn === 'prev' && s.prevBtn,
        s[size]
      )}
      style={{ ...style, display: hideArrow ? 'none' : 'block' }}
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
