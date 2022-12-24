import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { container, scrolling } from './Carousel.css'

export type CarouselProps = PropsWithChildren & {
  value: number
  onChange: (index: number) => void
  className?: string
}

export const Carousel: React.FC<CarouselProps> = ({
  value,
  onChange,
  className = '',
  children,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const baseX = useRef<number | null>(null)
  const skipHandleScroll = useRef(false)

  useEffect(() => {
    if (!carouselRef.current) return
    const width = carouselRef.current.offsetWidth
    const nextScrollLeft = value * width
    if (carouselRef.current.scrollLeft === nextScrollLeft) return
    carouselRef.current.scrollLeft = nextScrollLeft
    skipHandleScroll.current = true
  }, [value])

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (skipHandleScroll.current) return
      if (!carouselRef.current) return
      const width = carouselRef.current.offsetWidth
      const x = e.currentTarget.scrollLeft
      if (x % width === 0) {
        carouselRef.current.classList.remove(scrolling)
        onChange(x / width)
      }
    },
    [value, onChange],
  )

  const handlePointerDown = useCallback(() => {
    skipHandleScroll.current = false
  }, [])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!carouselRef.current) return
      carouselRef.current.classList.add(scrolling)
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
      className={`${container} ${className}`}
      ref={carouselRef}
      onScroll={handleScroll}
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
