'use client'

import { useEffect, useRef } from 'react'
import Slider from 'react-slick'

import Image from 'next/image'

import { Button, Icon } from '@/shared/components/ui'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import s from './PhotoSlider.module.scss'

import { ImagesType } from '../../api'

type Props = {
  images: ImagesType[]
  className?: string
  dotClass?: string
  imgClass?: string
  clickCallback?: () => void | undefined
  onSetActiveImageIdx?: (nextIdx: number) => void
  activeImageIdx?: number
}

const PhotoSlider = ({ images, className, dotClass }: Props) => {
  const sliderRef = useRef<Slider | null>(null)

  const defaultAva = './defaultPhoto.png'
  const Arrow = ({ direction }: { direction: 'prev' | 'next' }) => {
    return (
      <div>
        {direction === 'prev' ? (
          <Button
            variant={'icon'}
            className={s.imageLeftArrow}
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.slickPrev()
              }
            }}
          >
            <Icon iconId={'arrowIosBack'} width={'48px'} height={'48px'} />
          </Button>
        ) : (
          <Button
            variant={'icon'}
            className={s.imageRightArrow}
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.slickNext()
              }
            }}
          >
            <Icon iconId={'arrowIosForward'} width={'48px'} height={'48px'} />
          </Button>
        )}
      </div>
    )
  }

  // useEffect(() => {
  //     if(images.length > 0) {
  //         setIsReady(true)
  //     }
  // }, [images])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrow direction={'prev'} />,
    nextArrow: <Arrow direction={'next'} />,
    adaptiveHeight: true,
  }
  const dots = images?.length > 1 ? s.publicPostDots : 'slick-dots'

  useEffect(() => {
    if (sliderRef.current && images.length > 0) {
      sliderRef.current.slickGoTo(0) // Сброс на первый слайд
    }
  }, [images])

  return (
    <Slider
      key={images.length}
      {...settings}
      className={className ? className : ''}
      dotsClass={dotClass ? dotClass : dots}
      ref={sliderRef}
    >
      {images &&
        images?.map(image => (
          <div key={image.uploadId} className={s.slide} data-id={image.uploadId}>
            <Image
              src={image.url || defaultAva}
              alt={'Post Image'}
              width={image.width}
              height={image.height}
              className={s.image}
            />
          </div>
        ))}
    </Slider>
  )
}

export default PhotoSlider
