# react-swipeable-scroll-snap-carousel
A tiny swipeable carousel built with scroll snap for React

## Features
- Carousel by `scroll-snap-type`
- Swipeable by mouse event
- programmatically changed index

## Getting Started

```sh
npm install react-swipeable-scroll-snap-carousel
```

```jsx
import React, { useState } from 'react'
import { Carousel } from 'react-swipeable-scroll-snap-carousel'

function App() {
  const [index, setIndex] = useState(0)
  return (
    <Carousel index={index} onChangeIndex={setIndex}>
      <div style={{ backgroundColor: 'pink' }}>1</div>
      <div style={{ backgroundColor: 'skyblue' }}>2</div>
    </Carousel>
  )
}
```
