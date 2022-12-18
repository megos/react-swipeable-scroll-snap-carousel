import { useState } from 'react'
import { Carousel } from './Carousel'

function App() {
  const [index, setIndex] = useState(0)
  return (
    <div className="App">
      <div className="wrapper">
        <Carousel index={index} onChangeIndex={setIndex} />
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
