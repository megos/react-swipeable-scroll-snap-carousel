import React, { useState } from 'react'
import { Carousel } from './Carousel'

const items = (
  <>
    <div style={{ backgroundColor: 'pink' }}>1</div>
    <div style={{ backgroundColor: 'skyblue' }}>2</div>
    <div style={{ backgroundColor: 'limegreen' }}>3</div>
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
      <div className="buttons">
        <button onClick={() => setIndex(0)}>1</button>
        <button onClick={() => setIndex(1)}>2</button>
        <button onClick={() => setIndex(2)}>3</button>
      </div>
    </div>
  )
}

export default App
