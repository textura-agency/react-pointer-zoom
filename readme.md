# react-pointer-zoom 

A react component that uses a high-res source image to produce a zoom window on mouse hover

Based on [CarMax/react-cursor-zoom](https://github.com/CarMax/react-cursor-zoom)

## Demo

[Here](http://carmax.github.io/react-cursor-zoom/)

## Installation

`npm install react-pointer-zoom --save`
`yarn add react-pointer-zoom`


## Usage


```jsx
import PointerZoom from 'react-pointer-zoom';

<PointerZoom
    image={{
        src: "img/beach-small.jpg",
        width: 400,
        height: 300
    }}
    zoomImage={{
        src: "img/beach-large.jpg",
        width: 1600,
        height: 1200
    }}
    cursorOffset={{ x: 80, y: -80 }}
/>
```

## API

### image

> Required

`{ src, width, height }`

The inline image that will be used as a reference for cursor zoom

### zoomImage

> Required

`{ src, width, height }`

The high-res image to be used on hover

### cursorOffset

> Optional : default `{ x: 0, y: 0 }`

 `{ x: 0, y: 0 }` or `{ x, y }`

### size

> Optional : default `200`

`Number`

The size of the zoom window

### Styling

Component Props

`borderSize: number`
`borderColor: string`
`pointerStyle: {}`
`containerStyle: {}`
`magnifierContainerClassName: string`
`cursorZoomPointerClassName: string`
`cursorZoomMagnifierClassName: string`

Or using default classes

`.cursor-zoom-magnifier-container`
`.cursor-zoom-pointer`
`.cursor-zoom-magnifier-container`


