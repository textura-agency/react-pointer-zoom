# react-pointer-zoom 

A react component that uses a high-res source image to produce a zoom window on mouse hover

Based on [CarMax/react-cursor-zoom](https://github.com/CarMax/react-cursor-zoom)

updates: React ^18.2.0 support, css styling support, smooth snap preview feature

## Demo

[Watch Demo](https://react-pointer-zoom.vercel.app/)

## Installation

Via NPM

`npm install react-pointer-zoom --save`

Or Yarn

`yarn add react-pointer-zoom`


## Usage


```jsx
import PointerZoom from 'react-pointer-zoom';

<PointerZoom
    size={100}
    image={{
    src: "img/cat-small.jpg",
    }}
    zoomImage={{
    src: "img/cat-large.jpg",
    width: 1024,
    height: 768
    }}
    borderColor="white"
    borderSize="5px"
    cursorOffset={{
    x: 100,
    y: -20
    }}
    pointerStyle={{
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderWidth: "13.5px 23.4px 13.5px 0",
    borderColor: "transparent white transparent transparent",
    position: "absolute",
    left: "-18px",
    bottom: "10px"
    }}
    showPreview
    previewPosition={{ x: 100, y: 100 }}
    snapToPreview
    snapSmooth={0.075}
    snapDelay={300}
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

### showPreview

> Optional : default `false`

Shows zoom preview even if not hovered

### previewPosition

> Optional : default `{ x: 0, y: 0 }`

Sets preview position, works only if showPreview=true

### snapToPreview

> Optional : default `false`

If true return back to preview position on mouseover

### snapSmooth

> Optional : default `1` (value is between 0-1)

Interpolates to snap, making it smooth. 1 - immediately. 0 - no snap at all

### snapDelay

> Optional : default `300` (ms)

Sets the delay after which snapping will be activated

### Styling

Component Props

```jsx
borderSize: number
borderColor: string
pointerStyle: {}
containerStyle: {}
magnifierContainerClassName: string
cursorZoomPointerClassName: string
cursorZoomMagnifierClassName: string
```

Or using default classes

```
.cursor-zoom-magnifier-container
.cursor-zoom-pointer
.cursor-zoom-magnifier
```


