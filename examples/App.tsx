import React, { useState } from 'react'
import { Carousel } from '../src'

const items = (
  <>
    <div style={{ backgroundColor: 'pink' }}>1</div>
    <div style={{ backgroundColor: 'skyblue' }}>2</div>
    <div style={{ backgroundColor: 'limegreen' }}>3</div>
    <div style={{ backgroundColor: 'grey' }}>4</div>
  </>
)

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
