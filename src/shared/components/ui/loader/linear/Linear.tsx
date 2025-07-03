'use client'
import React from 'react'

interface LinearProps {
  width?: number | string
  height?: number
  color?: string
  speed?: number
  stroke?: number
  bgOpacity?: number
  radius?: 'auto'
}

const Linear = ({
  width = '100%',
  height,
  color = 'black',
  speed = 1.4,
  stroke = 5,
  bgOpacity = 0.1,
  radius,
}: LinearProps) => {
  const barHeight = height ?? stroke
  const bRadius = radius === 'auto' ? barHeight / 2 : 0

  const resolvedSize = typeof width === 'number' ? `${width}px` : width

  const containerStyle: React.CSSProperties = {
    flexShrink: 0,
    height: `${barHeight}px`,
    width: resolvedSize,
  }

  const innerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: `${barHeight}px`,
    width: resolvedSize,
    borderRadius: `${bRadius}px`,
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',
  }

  const beforeStyle: React.CSSProperties = {
    content: "''",
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: color,
    opacity: bgOpacity,
    transition: 'background-color 0.3s ease',
  }

  const afterStyle: React.CSSProperties = {
    content: "''",
    height: '100%',
    width: '100%',
    borderRadius: `${bRadius}px`,
    backgroundColor: color,
    animation: `zoom ${speed}s ease-in-out infinite`,
    transform: 'translateX(-100%)',
    transition: 'background-color 0.3s ease',
  }

  return (
    <>
      <style>
        {`
          @keyframes zoom {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div style={innerStyle}>
          <div style={beforeStyle} />
          <div style={afterStyle} />
        </div>
      </div>
    </>
  )
}

export default Linear
