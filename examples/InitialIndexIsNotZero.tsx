import React, { useState } from 'react'
import { Carousel } from '../src'
import { items } from './items'

function InitialIndexIsNotZero() {
  const [index, setIndex] = useState(1)
  return (
    <div className='App'>
      <div className='wrapper'>
        <Carousel index={index} onChangeIndex={setIndex}>
          {items}
        </Carousel>
      </div>
      <div className='center'>currentIndex: {index + 1}</div>
    </div>
  )
}

export default InitialIndexIsNotZero
