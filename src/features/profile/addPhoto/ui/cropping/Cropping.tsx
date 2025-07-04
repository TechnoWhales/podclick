'use client'
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import Slider from "react-slick";

import clsx from 'clsx'

import { Button, Icon, Popover, Typography } from '@/shared/components/ui'

import s from '@/features/profile/addPhoto/ui/cropping/Cropping.module.scss'


type RationMode = '1:1' | '4:5' | '16:9' | 'original'

type Props = {
  photoPreview: string
}

function Arrow({ className, onClick, type }: { className?: string; onClick?: () => void; type: 'next' | 'prev' }) {
  return (
    <Button variant={'icon'}
      className={clsx(className, s.arrow, type === 'next' && s.arrowNext, type === 'prev' && s.arrowPrev)}
      onClick={onClick}
    >
      <Icon iconId={type === 'next' ? 'arrowIosForward' : 'arrowIosBack'} />
    </Button>
  );
}

export const Cropping = ({ photoPreview }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
  const [ratioMode, setRatioMode] = useState<RationMode>('original')
  const rationOriginal = ratioMode === 'original'
  const ration1to1 = ratioMode === '1:1'
  const ration4to5 = ratioMode === '4:5'
  const ration16to9 = ratioMode === '16:9'
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    arrows: true,
    nextArrow: <Arrow type={'next'}/>,
    prevArrow: <Arrow type={'prev'}/>,

  };

  return (
    <>
      <div className={s.title}>
        <div className={s.arrowBack}>
          <Icon iconId={'arrowIosBack'} />
        </div>
        <Typography variant={'h1'}>Cropping</Typography>
        <Button className={s.nextBtn} variant={'link'}>
          {
            <Typography variant={'h3'} as={'h3'}>
              Next
            </Typography>
          }
        </Button>
      </div>
      <div className={clsx(s.cropWrapper, photoPreview && s.photoPreview)}>
        <Slider {...settings} className={s.slider}>
          <div className={s.cropContainer}>
            <Cropper
                image={photoPreview}
                crop={crop}
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={5}
                zoomSpeed={0.5}
                showGrid={false}
                cropSize={{ width: 492, height: 504 }}
                restrictPosition
                onCropChange={setCrop}
                onZoomChange={setZoom}
                style={{
                  cropAreaStyle: { border: 0, boxShadow: 'none' },
                  containerStyle: {
                    height: '498px',
                    borderBottomLeftRadius: '10px',
                    borderBottomRightRadius: '10px',
                  },
                }}
                onMediaLoaded={({ width, height }) => {
                  const cropWidth = 490
                  const cropHeight = 500
                  const zoomW = cropWidth / width
                  const zoomH = cropHeight / height
                  const requiredZoom = Math.max(zoomW, zoomH)

                  setMinZoom(requiredZoom)
                  setZoom(requiredZoom)
                }}
            />
          </div>

          {/*<div className={s.cropContainer}>*/}
          {/*  <Cropper*/}
          {/*      image={'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA7EAACAQMCAgQMAwgDAAAAAAAAAQIDBBESIQUxBhNBUQcUIjJSYXGBkaGxwSMzYhUWJEJDcnPwU1TR/8QAGwEAAwEBAQEBAAAAAAAAAAAAAAECAwQFBgf/xAAoEQEBAAIBAwIGAgMAAAAAAAAAAQIRAwQSIQUxBhNBUWFxMoEiI1L/2gAMAwEAAhEDEQA/AO9AAPyd9CAGMAQDAREAwAEAwAEAABkAwAEAAAIQwGZCGAzRESYhmQmMQGiAwGF40AEMwMAAgAAAAwDAEQxiwPQLAYJCDQIBhgWjRAYAEQGLAjIRIQzIQxDMhDEMyAYAa5DACWQGGBpD0QwA8DwXMSIB4ArQRAkGBaGyDA0hldo2iLBIRNg2iBLAsE2U0cCJCZNhotAMQjIQxAZMTJCGaIDAZrkh4DA0EjI0MEM1kSEDQDaL14BIMDANEMCGMNBEYYAegQDAWgiIlgRNhotCJMTM7iaOBEmJkWKRESEI0WIkxDMgAANeNBgZpIyGBoEPBpIREkAFzwQDAwHogAYGVoiESEGjIBgGgiBIiTYaIEmRZFxMiLGDRlYpBiJNETOnCEyQmJRAADNeNCJG0jIDAZpIkDDIFyQhgBgi5CAAAwAGA9AgYMBUEIbMetf2lD865pQ9s1n4Dx4887rGbK5SL2yLNRcdJuFUP67n/bFsw/3q8Y1xsLCrW0LVJ7JRXezpw9L6vk9sL/abz8c+roiJy8+KceuZyjbU7G2xLQ3VqrEZZimnzw1rjlevbL2OH6c8c4xS4fb1rfjc26mJS8UlKnpT2w8PKeU9sLZJ7pnVx/D/AFOX8rIzvV4T2evMTON8FPFKvEejcvGq9StWpVnFynPVJppNZb355OzPE6rgvBzZcd95dOrDLukqLEMRytCAAA2QhiGjojI8jQsDNJCMYhmkSBiQyoCK61zQo/nV6cHzxKaTx7DVdM4VanRjiXi9SpTqKi5KUJYaw03hrfkmeD9EbmUeIXFOUnJ1I5eW3lp9vfzPV9P9OnV43K5a1+GHLy9mvD3u76ScItKU6lS5XkRcmoxbeEsvCxucfeeFrhsadWdhZVbiNOcY/i1Y0nNPO8VhvGy5779hoW4y8mUV68ldCnRo6epo06f+OCj9D2uP0Xpsf5bv7rmvUZ32dVQ6fXd/a29S04UoVK+fw6k3mOM7Zws8u7fJRX6V8RqUuslX6mDSwoxSeXySxu2aWNWUfK1aebcs8ljdmq/akY1fG5b4yqMX2Lv9rOvDoOnw9sJ/bO8ud+rtbS0veIx67ifEalpbc95J1GvW3tH2bsnd8P6OxoS6uN7dVP8AkdWp8ecV8EcZQ4vWuZxlWqOeOUeyPsRmVuPV40tMYwhBdst2dU48ZNSM9qOI1Lajq8WrXNHuUpOa9+dRgWPSaVpXlHrnRc/J66i2k1nt7t0t0Yt/xChU1arujr7k8vPdhHMXb8rV35aa5Monf1q1StGPWVp1EklHMm0l2JZ7DUcbp9ZwuvHuWr4Go4DxGUqsbS5uK8Ke+h0tLee7LT25m5uaFpKlKMo3FbKe9WvJZeO1LC+QBu/Ane6al/aSl58VNe54+561k+f/AAb11S6VWtOpHK1PSn2Sw0vqe90pakfC+vcXZ1fd/wBTb1+kvdxT8LQYAeG6SAAEa8aI5GjojJIYkNGkI0MQzSJAxAxwMbiFONazr0JcqlOUH7019z5rtJS4d0g/EykpuD279j6SvFqpSj3po+dellv+yuktWFHKhSmury8tRXLd78u89z0Dl/2Z4fpz9Xj/AISukhdyqT00bS6qP/E4fOeEW/x//Wo0f89wk0vYk18yuFxUqUo6qjaaTw28C1n1Tz2LxytWtrCUpXdKWtqHV06Mk9/1N7rbuOYqXcpSj3JcjbdJp/wEf7/sc7SpVK+vqY50UnOW6WElv7fYIMu4vK0Yyp06tSnhb6ZYz35x7Use0xqdrd3l1CjqdSvNaknPddu7fLbcjcry6unfLcl8c/RonQuqlG88ZpycZ61NNYzzz2gShUtOv04ZzB9qXPcuhLrPIlLPWYw3zzyTz352fqZVUnqq9Zlvym23z378F1nB+R/vOSx9GAVQhUpypVJRnBTacZNYTXJtPtOop1+spRl2439vaaO+0/sy1xGOZynLKkm+axldmzW3/plWVaUqHrCGp4RX8T6S0avoV0/mfRdnPVTjI+abt9Xfqp61I+hui9z41wa0relSj8cYf0Pl/iPi8YZ/uPR6HLxcW7QAI+V07iAYE6C0aEhmuMRUhoQGsSaGICiSBiGaEouF5LPCvCza9XxuNbT+ZBfLb7HvFVeQeS+GOz/h7e408pOL+TX3O70nPs6yfncTzzu4a5nhVx1lhRl+nHwMzWaLgFXVZyj6EmbRVD7ePJYnG49Zayj/AKjScLr+LXn4mNk4uLeFNPnF+p7+/B0FyuupSj3/AFOXuqUo1ZekvmKhn17TqasaWcxmk6VXG049jXfjLTXPBBcGvZaurotY7JbJ+xsot7+ULWdtOMZ03vFSTbpvvjvszoLW/py0xo1ZunjzKrTcXnknzaxgINeNtZS4BcynHrpUoR7lLL+SMv8AZMqemjGprrPLliGFBYxl79ib295vnWtqNLrKlenDbtkk/d2nNcT4zHyqVhJvVs54wn7F738RkxOM3Ea1zCjTk+poRVOK1atKXPDwts/RFnDY1qkdNGjOpJ5eIxbwvd2GrS/l1Zb5v7Gxta1On51RpYxhSxn1PA+Pt7p3ewu9eEeMUKlCcOupuE1zT9e6PY/BbeeM9GqMdW9OTj9/ueM3c41qWmnTcd89uPmeo+CKFW3s60amnROSlHEs954vxDjhl01uN9rNO3odzPz9npiAEB8Np6ZAMBaCxDI5JJlyxCSGRGaSkkAkGSySAQFwjZwfhTs+v6PVpad6bUvt9zvDR9KbLx3hNxQ2zODSzyT7DThz+XzY5/awa3LHz5wGrpnVpy9TNvKcTVXNhV4VeTjUnDUsrZZ/34lTuZfy9Y/eks/D7n32PJjZuPJ7Mo2s6pqb/q6k+zPzE+tqebT+OX9XglGzu5d6Xctl8EK8uJ/LrXuMv5o59fJi0R9I2keD1fRY3wqpHzokfPw+6vlVqtEfSb9iJJejHH1NkuHy9EzLXhmrzok5c+MhzirSQo1JebH5GTTsriXm592x2fDeCUZadUTruG9HraOn8NfA83qPVsOP6OjDptvKrbgNzWn+W37j1HoDwuvYUvxItL1nSWvCbenp0018DZ0KMacPJieH1vquXUYdmvDr4uCcd2uDIAeO2ACAzNYNEcjTHKhJMkiAzWVOk0wIoeS5S0kCEBcJIouqXWUpR70XJiHfME8PNeNdDpXdzKWlbsxrboF6WPgeouESOiJ0zruoxx7ZkOzC+dOFt+hFCn50TJ/de2p/00dhKJTVgY5dVz2+clzHD7OIu+D06fm018DQ3nDo+iehXVvqNLd2P6To4OrynvUZ8f2cO7H9Jk21p+k30+H/AKS2jYfpOzLq9z3ZTjqvhtvp0nTWcPIiYVpa6TbUIaTyeo5e6unDHTJpovRXBFiOeRdAAIVgHkgGQEEx5ADNIySyAFwjDIAapPI8gBUAyGQAf0BZAAGCZCUQARxjVYGHVoRkAGbRQ7WI428QAdypMinSMmEQAie6lqGwAohkTACaCyAASb//2Q=='}*/}
          {/*      crop={crop}*/}
          {/*      zoom={zoom}*/}
          {/*      minZoom={minZoom}*/}
          {/*      maxZoom={5}*/}
          {/*      zoomSpeed={0.5}*/}
          {/*      showGrid={false}*/}
          {/*      cropSize={{ width: 492, height: 504 }}*/}
          {/*      restrictPosition*/}
          {/*      onCropChange={setCrop}*/}
          {/*      onZoomChange={setZoom}*/}
          {/*      style={{*/}
          {/*        cropAreaStyle: { border: 0, boxShadow: 'none' },*/}
          {/*        containerStyle: {*/}
          {/*          height: '498px',*/}
          {/*          borderBottomLeftRadius: '10px',*/}
          {/*          borderBottomRightRadius: '10px',*/}
          {/*        },*/}
          {/*      }}*/}
          {/*      onMediaLoaded={({ width, height }) => {*/}
          {/*        const cropWidth = 490*/}
          {/*        const cropHeight = 500*/}
          {/*        const zoomW = cropWidth / width*/}
          {/*        const zoomH = cropHeight / height*/}
          {/*        const requiredZoom = Math.max(zoomW, zoomH)*/}

          {/*        setMinZoom(requiredZoom)*/}
          {/*        setZoom(requiredZoom)*/}
          {/*      }}*/}
          {/*  />*/}
          {/*</div>*/}
        </Slider>
        <div className={s.popoversWrapper}>
          <div className={s.controlsWrapper}>
            <Popover buttonText={<Icon iconId={'expandOutline'} />} opacity={0.8}>
              <div
                className={clsx(s.aspectRatioWrapper, s.imageOutline, rationOriginal && s.active)}
                onClick={() => setRatioMode('original')}
              >
                <Typography variant={rationOriginal ? 'h3' : 'regular_text_16'}>
                  Оригинал
                </Typography>{' '}
                <Icon iconId={'imageOutline'} />
              </div>
              <div
                className={clsx(s.aspectRatioWrapper, ration1to1 && s.active)}
                onClick={() => setRatioMode('1:1')}
              >
                <Typography variant={ration1to1 ? 'h3' : 'regular_text_16'}>1:1</Typography>{' '}
                <Icon iconId={'square'} />
              </div>
              <div
                className={clsx(s.aspectRatioWrapper, ration4to5 && s.active)}
                onClick={() => setRatioMode('4:5')}
              >
                <Typography variant={ration4to5 ? 'h3' : 'regular_text_16'}>4:5</Typography>{' '}
                <Icon iconId={'rectangleVertical'} />
              </div>
              <div
                className={clsx(s.aspectRatioWrapper, ration16to9 && s.active)}
                onClick={() => setRatioMode('16:9')}
              >
                <Typography variant={ration16to9 ? 'h3' : 'regular_text_16'}>16:9</Typography>{' '}
                <Icon iconId={'rectangleHorizontal'} />
              </div>
            </Popover>
            <Popover buttonText={<Icon iconId={'maximizeOutline'} />} opacity={0.8}>
              <input
                className={s.rangeInput}
                type={'range'}
                onChange={e => setZoom(Number(e.currentTarget.value))}
                min={minZoom}
                max={5}
                step={0.1}
                value={zoom}
              />
            </Popover>
          </div>

          <Popover></Popover>
        </div>
      </div>
    </>
  )
}
