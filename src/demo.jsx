import React from "react";
import PointerZoom from "./pointer-zoom.jsx";
import { createRoot } from 'react-dom/client';

const Demo = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '64px',
    padding: '64px'
  }}>
    <h1>React Pointer Zoom Examples</h1>
    <PointerZoom
      size={100}
      image={{
        src: "img/cat-small.jpg",
        width: 400,
        height: 300
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
    <PointerZoom
      size={100}
      image={{
        src: "img/cat-small.jpg",
        width: 400,
        height: 300
      }}
      zoomImage={{
        src: "img/cat-large.jpg",
        width: 1024,
        height: 768
      }}
      borderColor="white"
      borderSize="5px"
      showPreview
      previewPosition={{ x: 100, y: 100 }}
      placeholderZoomImageSrc='img/beach-small.jpg'
      snapSmooth={0.075}
      snapDelay={0}
    />
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
    <PointerZoom
      image={{
        src: "img/fall-small.jpg",
        width: 400,
        height: 250
      }}
      zoomImage={{
        src: "img/fall-large.jpg",
        width: 1920,
        height: 1200
      }}
    />
  </div>
);

const container = document.getElementById('demo');
const root = createRoot(container);
root.render(<Demo />);