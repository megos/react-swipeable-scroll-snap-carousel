import { useCallback, useEffect, useRef } from 'react'
import './Carousel.css'

export const Carousel: React.FC<{
  index: number
  onChangeIndex: (index: number) => void
}> = ({ index, onChangeIndex }) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const baseX = useRef<number | null>(null)
  const skip = useRef(false)

  const width = 500

  useEffect(() => {
    if (!carouselRef.current) return
    if (carouselRef.current.scrollLeft === index * width) return
    carouselRef.current.scrollTo({
      left: index * width,
      behavior: 'smooth',
    })
    skip.current = true
  }, [index])

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const x = e.currentTarget.scrollLeft
      if (skip.current) {
        if (x / width === index) skip.current = false
        return
      }
      if (x % width === 0 && carouselRef.current) {
        carouselRef.current.style.scrollSnapType = 'x mandatory'
        carouselRef.current.style.scrollBehavior = 'smooth'
        onChangeIndex(x / width)
      }
    },
    [index, onChangeIndex],
  )

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!carouselRef.current) return
      carouselRef.current.style.scrollSnapType = 'none'
      carouselRef.current.style.scrollBehavior = 'auto'
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
      className="carousel"
      style={{ width }}
      ref={carouselRef}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className="carousel-item">
        <div style={{ backgroundColor: 'pink', width, height: 500 }}>1</div>
      </div>
      <div className="carousel-item">
        <div style={{ backgroundColor: 'skyblue', width, height: 500 }}>2</div>
      </div>
      <div className="carousel-item">
        <div style={{ backgroundColor: 'limegreen', width, height: 500 }}>
          3
        </div>
      </div>
    </div>
  )
}
