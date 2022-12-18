import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { container } from './Carousel.css'

export const Carousel: React.FC<PropsWithChildren & {
  index: number
  onChangeIndex: (index: number) => void
}> = ({ index, onChangeIndex, children }) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const baseX = useRef<number | null>(null)
  const skip = useRef(false)

  useEffect(() => {
    if (!carouselRef.current) return
    const width = carouselRef.current.offsetWidth
    if (carouselRef.current.scrollLeft === index * width) return
    carouselRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth',
    })
    skip.current = true
  }, [index])

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (!carouselRef.current) return
      const width = carouselRef.current.offsetWidth
      const x = e.currentTarget.scrollLeft
      if (skip.current) {
        if (x / width === index) skip.current = false
        return
      }
      if (x % width === 0 && carouselRef.current) {
        carouselRef.current.classList.remove('scrolling')
        onChangeIndex(x / width)
      }
    },
    [index, onChangeIndex],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!carouselRef.current) return
      carouselRef.current.classList.add('scrolling')
      baseX.current = carouselRef.current.scrollLeft + e.pageX
    },
    [],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!(carouselRef.current && baseX.current)) return
      carouselRef.current.scrollLeft = baseX.current - e.pageX
    },
    [],
  )

  const handleEnd = useCallback(() => {
    if (!(carouselRef.current && baseX.current)) return
    const width = carouselRef.current.offsetWidth
    const index = Math.trunc(
      (carouselRef.current.scrollLeft + width / 2) / width,
    )
    carouselRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth',
    })
    baseX.current = null
  }, [])

  return (
    <div
      className={container}
      ref={carouselRef}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {children}
    </div>
  )
}
