import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { container, scrolling } from './Carousel.css'

export type CarouselProps = PropsWithChildren<{
  index: number
  onChangeIndex: (index: number) => void
  className?: string
}>

export const Carousel: React.FC<CarouselProps> = ({
  index,
  onChangeIndex,
  className = '',
  children,
}) => {
  const isFirstScrollRef = useRef(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const baseXRef = useRef<number | null>(null)
  const skipHandleScrollRef = useRef(false)

  useEffect(() => {
    if (!carouselRef.current) return
    const isFirstScroll = isFirstScrollRef.current
    isFirstScrollRef.current = false
    const width = carouselRef.current.offsetWidth
    const nextScrollLeft = index * width
    if (carouselRef.current.scrollLeft === nextScrollLeft) return
    if (isFirstScroll) {
      carouselRef.current.classList.add(scrolling)
    } else {
      // Skip handling the scroll event. for example, does not fire changing to index 2 when the index changes from 1 to 3.
      skipHandleScrollRef.current = true
    }
    carouselRef.current.scrollLeft = nextScrollLeft
  }, [index])

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (skipHandleScrollRef.current) return
      if (!carouselRef.current) return
      const width = carouselRef.current.offsetWidth
      const x = e.currentTarget.scrollLeft
      if (x % width === 0) {
        carouselRef.current.classList.remove(scrolling)
        onChangeIndex(x / width)
      }
    },
    [onChangeIndex],
  )

  const handlePointerDown = useCallback(() => {
    skipHandleScrollRef.current = false
  }, [])

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) !== 0) skipHandleScrollRef.current = false
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!carouselRef.current) return
      carouselRef.current.classList.add(scrolling)
      baseXRef.current = carouselRef.current.scrollLeft + e.pageX
    },
    [],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!(carouselRef.current && baseXRef.current)) return
      carouselRef.current.scrollLeft = baseXRef.current - e.pageX
      // Avoid overflow scrolling Safari
      e.preventDefault()
    },
    [],
  )

  const handleEnd = useCallback(() => {
    if (!(carouselRef.current && baseXRef.current)) return
    const width = carouselRef.current.offsetWidth
    const x = carouselRef.current.scrollLeft
    const index = Math.trunc((x + width / 2) / width)
    const nextScrollLeft = index * width
    if (x === nextScrollLeft) {
      carouselRef.current.classList.remove(scrolling)
    }
    carouselRef.current.scrollTo({
      left: nextScrollLeft,
      behavior: 'smooth',
    })
    baseXRef.current = null
  }, [])

  return (
    <div
      className={`${container} ${className}`}
      ref={carouselRef}
      onScroll={handleScroll}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      {children}
    </div>
  )
}
