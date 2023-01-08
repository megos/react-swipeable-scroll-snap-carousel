import React, { useState } from 'react'
import { Carousel } from '../src'
import { items } from './items'

function App() {
  const [index, setIndex] = useState(0)
  return (
    <div className="App">
      <div className="wrapper">
        <Carousel index={index} onChangeIndex={setIndex}>
          {items}
        </Carousel>
      </div>
      <div className="buttons center">
        <button
          onClick={() => setIndex((prev) => prev - 1)}
          disabled={index === 0}
        >
          &lt;
        </button>
        <button onClick={() => setIndex(0)}>1</button>
        <button onClick={() => setIndex(1)}>2</button>
        <button onClick={() => setIndex(2)}>3</button>
        <button onClick={() => setIndex(3)}>4</button>
        <button
          onClick={() => setIndex((prev) => prev + 1)}
          disabled={index === 3}
        >
          &gt;
        </button>
      </div>
      <div className="center">currentIndex: {index + 1}</div>
    </div>
  )
}

export default App
