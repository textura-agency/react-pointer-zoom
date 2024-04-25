function applyStyles(element, styles) {
    for (let key in styles) {
        if (styles.hasOwnProperty(key)) {
            element.style[key] = styles[key];
        }
    }
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

export const Magnifier = (props) => {
    const halfSizeY = props.size / 2;
    const halfSizeX = (props.size) / 2;
    let snapTimeout = null

    const state = { 
        x: props.previewPosition?.x || 0, 
        y: props.previewPosition?.y || 0, 
        imageOffsetX: 0, 
        imageOffsetY: 0, 
        offsetX: 0, 
        offsetY: 0, 
        imageOffsetY: 0, 
        sx: props.previewPosition?.x || 0, 
        sy: props.previewPosition?.y || 0, 
        visible: false,
        startSnapping: false,
        zoomImageSrc: props.placeholderZoomImageSrc ? props.placeholderZoomImageSrc : props.zoomImage.src
    }

    const magnifierContainer = document.createElement('div')
    magnifierContainer.classList.add(props.magnifierContainerClassName || 'cursor-zoom-magnifier-container')
    applyStyles(magnifierContainer, props.containerStyle || {
        position: 'absolute',
        // display: 'none',
        visibility: 'hidden',
        top: props.y + 'px',
        left: props.x + 'px',
        width: props.size + 'px',
        height: props.size + 'px',
        marginLeft: -halfSizeX + props.cursorOffset.x + 'px',
        marginTop: -halfSizeY + props.cursorOffset.y + 'px',
        backgroundColor: 'white',
        boxShadow: '1px 1px 6px rgba(0,0,0,0.3)',
        zIndex: 9999
    })

    const cursorZoomPointer = document.createElement('div')
    cursorZoomPointer.classList.add(props.cursorZoomPointerClassName || 'cursor-zoom-pointer')
    applyStyles(cursorZoomPointer, props.pointerStyle || {})

    const cursorZoomMagnifier = document.createElement('div')
    cursorZoomMagnifier.classList.add(props.cursorZoomMagnifierClassName || 'cursor-zoom-magnifier')
    applyStyles(cursorZoomMagnifier, {
        width: props.size + 'px',
        height: props.size + 'px',
        backgroundImage: 'url(' + state.zoomImageSrc + ')',
        backgroundRepeat: 'no-repeat',
        border: props.borderSize + ' solid ' + props.borderColor
    })
    magnifierContainer.appendChild(cursorZoomPointer)
    magnifierContainer.appendChild(cursorZoomMagnifier)

    cursorZoomMagnifier.addEventListener('click', props.handleClick)

    let rq = requestAnimationFrame(function render() {
        if (props.snapToPreview && (state.x !== state.sx || state.y !== state.sy) && !state.visible && state.startSnapping) {
            state.x = lerp(state.x, state.imageOffsetX + state.sx, props.snapSmooth || 1)
            state.y = lerp(state.y, state.imageOffsetY + state.sy, props.snapSmooth || 1)
            updateZoom(props, true)
            updatePosition(props)
        }

        // Stop Snapping Delay
        if (state.visible) {
            clearTimeout(snapTimeout)
            snapTimeout = null
            state.startSnapping = false
        } else if (!snapTimeout) {
            snapTimeout = setTimeout(() => {
                state.startSnapping = true
            }, props.snapDelay || 300)
        }

        rq = requestAnimationFrame(render)
    })

    const clear = () => { 
        cursorZoomMagnifier.removeEventListener('click', props.handleClick)
        cancelAnimationFrame(rq)
    }
    const updateVisibility = (props, forceUpdate) => {
        const smallImage = props.ref.getBoundingClientRect()
        state.visible = props.offsetY < smallImage.height && props.offsetX < smallImage.width && props.offsetY > 0 && props.offsetX > 0;
        const clampedX = Math.min(Math.max(props.x, props.imageOffsetX), props.imageOffsetX+smallImage.width);
        const clampedY = Math.min(Math.max(props.y, props.imageOffsetY), props.imageOffsetY+smallImage.height);

        if (state.visible) {
            state.x = clampedX
            state.y = clampedY
            state.imageOffsetX = props.imageOffsetX
            state.imageOffsetY = props.imageOffsetY
        }
        if (forceUpdate) {
            state.imageOffsetX = props.imageOffsetX
            state.imageOffsetY = props.imageOffsetY
            state.x = state.sx + props.imageOffsetX 
            state.y = state.sy + props.imageOffsetY 
        }
        magnifierContainer.style.visibility = state.visible || props.showPreview ? 'visible' : 'hidden'

        updatePosition(props)
    }
    const updatePosition = (props) => {
        magnifierContainer.style.top = state.y + 'px'
        magnifierContainer.style.left = state.x + 'px'
    }
    const updateZoom = (props, forceUpdate) => {
        if (!state.visible && !forceUpdate) { return }

        const smallImage = props.ref.getBoundingClientRect()
        const magnifier = magnifierContainer.getBoundingClientRect()

        const halfSizeY = magnifier.height / 2;
        const halfSizeX = (magnifier.width + (magnifier.width * .4)) / 2;
        const magX = props.zoomImage.width / smallImage.width;
        const magY = props.zoomImage.height / smallImage.height;

        const bgX = -((state.x - state.imageOffsetX) * magX - halfSizeX);
        const bgY = -((state.y - state.imageOffsetY) * magY - halfSizeY);
        cursorZoomMagnifier.style.backgroundPosition = bgX + 'px ' + bgY + 'px'
    }
    const updateZoomImage = (props) => {
        if (state.visible) {
            if (state.zoomImageSrc !== props.zoomImage.src) {
                state.zoomImageSrc = props.zoomImage.src
                cursorZoomMagnifier.style.backgroundImage = 'url(' + state.zoomImageSrc + ')'
                magnifierContainer.classList.add('cursor-pointer-loading')
            }
        }
    }

    return {
        magnifierContainer,
        clear,
        updateVisibility,
        updateZoom,
        updateZoomImage
    }
}