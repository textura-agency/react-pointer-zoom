"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Magnifier = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function applyStyles(element, styles) {
  for (var key in styles) {
    if (styles.hasOwnProperty(key)) {
      element.style[key] = styles[key];
    }
  }
}
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}
var Magnifier = exports.Magnifier = function Magnifier(props) {
  var _props$previewPositio, _props$previewPositio2, _props$previewPositio3, _props$previewPositio4;
  var halfSizeY = props.size / 2;
  var halfSizeX = props.size / 2;
  var snapTimeout = null;
  var state = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
    x: ((_props$previewPositio = props.previewPosition) === null || _props$previewPositio === void 0 ? void 0 : _props$previewPositio.x) || 0,
    y: ((_props$previewPositio2 = props.previewPosition) === null || _props$previewPositio2 === void 0 ? void 0 : _props$previewPositio2.y) || 0,
    imageOffsetX: 0,
    imageOffsetY: 0,
    offsetX: 0,
    offsetY: 0
  }, "imageOffsetY", 0), "sx", ((_props$previewPositio3 = props.previewPosition) === null || _props$previewPositio3 === void 0 ? void 0 : _props$previewPositio3.x) || 0), "sy", ((_props$previewPositio4 = props.previewPosition) === null || _props$previewPositio4 === void 0 ? void 0 : _props$previewPositio4.y) || 0), "visible", false), "startSnapping", false), "zoomImageSrc", props.placeholderZoomImageSrc ? props.placeholderZoomImageSrc : props.zoomImage.src);
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
    backgroundImage: 'url(' + state.zoomImageSrc + ')',
    backgroundRepeat: 'no-repeat',
    border: props.borderSize + ' solid ' + props.borderColor
  });
  magnifierContainer.appendChild(cursorZoomPointer);
  magnifierContainer.appendChild(cursorZoomMagnifier);
  cursorZoomMagnifier.addEventListener('click', props.handleClick);
  var rq = requestAnimationFrame(function render() {
    if (props.snapToPreview && (state.x !== state.sx || state.y !== state.sy) && !state.visible && state.startSnapping) {
      state.x = lerp(state.x, state.imageOffsetX + state.sx, props.snapSmooth || 1);
      state.y = lerp(state.y, state.imageOffsetY + state.sy, props.snapSmooth || 1);
      updateZoom(props, true);
      updatePosition(props);
    }

    // Stop Snapping Delay
    if (state.visible) {
      clearTimeout(snapTimeout);
      snapTimeout = null;
      state.startSnapping = false;
    } else if (!snapTimeout) {
      snapTimeout = setTimeout(function () {
        state.startSnapping = true;
      }, props.snapDelay || 300);
    }
    rq = requestAnimationFrame(render);
  });
  var clear = function clear() {
    cursorZoomMagnifier.removeEventListener('click', props.handleClick);
    cancelAnimationFrame(rq);
  };
  var updateVisibility = function updateVisibility(props, forceUpdate) {
    var smallImage = props.ref.getBoundingClientRect();
    state.visible = props.offsetY < smallImage.height && props.offsetX < smallImage.width && props.offsetY > 0 && props.offsetX > 0;
    var clampedX = Math.min(Math.max(props.x, props.imageOffsetX), props.imageOffsetX + smallImage.width);
    var clampedY = Math.min(Math.max(props.y, props.imageOffsetY), props.imageOffsetY + smallImage.height);
    if (state.visible) {
      state.x = clampedX;
      state.y = clampedY;
      state.imageOffsetX = props.imageOffsetX;
      state.imageOffsetY = props.imageOffsetY;
    }
    if (forceUpdate) {
      state.imageOffsetX = props.imageOffsetX;
      state.imageOffsetY = props.imageOffsetY;
      state.x = state.sx + props.imageOffsetX;
      state.y = state.sy + props.imageOffsetY;
    }
    magnifierContainer.style.visibility = state.visible || props.showPreview ? 'visible' : 'hidden';
    updatePosition(props);
  };
  var updatePosition = function updatePosition(props) {
    magnifierContainer.style.top = state.y + 'px';
    magnifierContainer.style.left = state.x + 'px';
  };
  var updateZoom = function updateZoom(props, forceUpdate) {
    if (!state.visible && !forceUpdate) {
      return;
    }
    var smallImage = props.ref.getBoundingClientRect();
    var magnifier = magnifierContainer.getBoundingClientRect();
    var halfSizeY = magnifier.height / 2;
    var halfSizeX = (magnifier.width + magnifier.width * .4) / 2;
    var magX = props.zoomImage.width / smallImage.width;
    var magY = props.zoomImage.height / smallImage.height;
    var bgX = -((state.x - state.imageOffsetX) * magX - halfSizeX);
    var bgY = -((state.y - state.imageOffsetY) * magY - halfSizeY);
    cursorZoomMagnifier.style.backgroundPosition = bgX + 'px ' + bgY + 'px';
  };
  var updateZoomImage = function updateZoomImage(props) {
    if (state.visible) {
      if (state.zoomImageSrc !== props.zoomImage.src) {
        state.zoomImageSrc = props.zoomImage.src;
        cursorZoomMagnifier.style.backgroundImage = 'url(' + state.zoomImageSrc + ')';
        magnifierContainer.classList.add('cursor-pointer-loading');
      }
    }
  };
  return {
    magnifierContainer: magnifierContainer,
    clear: clear,
    updateVisibility: updateVisibility,
    updateZoom: updateZoom,
    updateZoomImage: updateZoomImage
  };
};