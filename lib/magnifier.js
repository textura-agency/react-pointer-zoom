"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Magnifier = void 0;
function applyStyles(element, styles) {
  for (var key in styles) {
    if (styles.hasOwnProperty(key)) {
      element.style[key] = styles[key];
    }
  }
}
var Magnifier = exports.Magnifier = function Magnifier(props) {
  var halfSizeY = props.size / 2;
  var halfSizeX = props.size / 2;
  var magnifierContainer = document.createElement('div');
  magnifierContainer.classList.add(props.magnifierContainerClassName || 'cursor-zoom-magnifier-container');
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
  });
  var cursorZoomPointer = document.createElement('div');
  cursorZoomPointer.classList.add(props.cursorZoomPointerClassName || 'cursor-zoom-pointer');
  applyStyles(cursorZoomPointer, props.pointerStyle || {});
  var cursorZoomMagnifier = document.createElement('div');
  cursorZoomMagnifier.classList.add(props.cursorZoomMagnifierClassName || 'cursor-zoom-magnifier');
  applyStyles(cursorZoomMagnifier, {
    width: props.size + 'px',
    height: props.size + 'px',
    backgroundImage: 'url(' + props.zoomImage.src + ')',
    backgroundRepeat: 'no-repeat',
    border: props.borderSize + ' solid ' + props.borderColor
  });
  magnifierContainer.appendChild(cursorZoomPointer);
  magnifierContainer.appendChild(cursorZoomMagnifier);
  cursorZoomMagnifier.addEventListener('click', props.handleClick);
  var clear = function clear() {
    return cursorZoomMagnifier.removeEventListener('click', props.handleClick);
  };
  var updateVisibility = function updateVisibility(props) {
    var smallImage = props.ref.getBoundingClientRect();
    var isVisible = props.offsetY < smallImage.height && props.offsetX < smallImage.width && props.offsetY > 0 && props.offsetX > 0;
    magnifierContainer.style.visibility = isVisible ? 'visible' : 'hidden';
    magnifierContainer.style.top = props.y + 'px';
    magnifierContainer.style.left = props.x + 'px';
  };
  var updateZoom = function updateZoom(props) {
    var smallImage = props.ref.getBoundingClientRect();
    var magnifier = magnifierContainer.getBoundingClientRect();

    // console.log(smallImage.width, '---', props.zoomImage.width,  props.smallImage.width)
    // console.log(props.size, '---', magnifier.width)

    var halfSizeY = magnifier.height / 2;
    var halfSizeX = (magnifier.width + magnifier.width * .4) / 2;
    var magX = props.zoomImage.width / smallImage.width;
    var magY = props.zoomImage.height / smallImage.height;
    var bgX = -(props.offsetX * magX - halfSizeX);
    var bgY = -(props.offsetY * magY - halfSizeY);
    cursorZoomMagnifier.style.backgroundPosition = bgX + 'px ' + bgY + 'px';
  };
  return {
    magnifierContainer: magnifierContainer,
    clear: clear,
    updateVisibility: updateVisibility,
    updateZoom: updateZoom
  };
};