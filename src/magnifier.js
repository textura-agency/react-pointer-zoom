function applyStyles(element, styles) {
    for (let key in styles) {
        if (styles.hasOwnProperty(key)) {
            element.style[key] = styles[key];
        }
    }
}

export const Magnifier = (props) => {
    const halfSizeY = props.size / 2;
    const halfSizeX = (props.size) / 2;

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
        backgroundImage: 'url(' + props.zoomImage.src + ')',
        backgroundRepeat: 'no-repeat',
        border: props.borderSize + ' solid ' + props.borderColor
    })
    magnifierContainer.appendChild(cursorZoomPointer)
    magnifierContainer.appendChild(cursorZoomMagnifier)

    cursorZoomMagnifier.addEventListener('click', props.handleClick)
    const clear = () => cursorZoomMagnifier.removeEventListener('click', props.handleClick)
    const updateVisibility = (props) => {
        const smallImage = props.ref.getBoundingClientRect()
        const isVisible = props.offsetY < smallImage.height && props.offsetX < smallImage.width && props.offsetY > 0 && props.offsetX > 0;
        magnifierContainer.style.visibility = isVisible ? 'visible' : 'hidden'

        magnifierContainer.style.top = props.y + 'px'
        magnifierContainer.style.left = props.x + 'px'
    }
    const updateZoom = (props) => {
        const smallImage = props.ref.getBoundingClientRect()
        const magnifier = magnifierContainer.getBoundingClientRect()

        // console.log(smallImage.width, '---', props.zoomImage.width,  props.smallImage.width)
        // console.log(props.size, '---', magnifier.width)

        const halfSizeY = magnifier.height / 2;
        const halfSizeX = (magnifier.width + (magnifier.width * .4)) / 2;
        const magX = props.zoomImage.width / smallImage.width;
        const magY = props.zoomImage.height / smallImage.height;

        const bgX = -(props.offsetX * magX - halfSizeX);
        const bgY = -(props.offsetY * magY - halfSizeY);
        cursorZoomMagnifier.style.backgroundPosition = bgX + 'px ' + bgY + 'px'
    }

    return {
        magnifierContainer,
        clear,
        updateVisibility,
        updateZoom
    }
}