import React from "react";
import PropTypes from "prop-types";
import { Magnifier } from "./magnifier";

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function getOffset(el) {
  var x = 0;
  var y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    // FF & IE don't support body's scrollTop - use window instead
    x +=
      el.offsetLeft -
      (el.tagName === "BODY" ? window.pageXOffset : el.scrollLeft);
    y +=
      el.offsetTop -
      (el.tagName === "BODY" ? window.pageYOffset : el.scrollTop);
    el = el.offsetParent;
  }

  return { x: x, y: y };
}

class PointerZoom extends React.Component {
  constructor() {
    super();
    this.state = {
      clientX: 0,
      clientY: 0,
      x: 0,
      y: 0,
      offsetX: -1,
      offsetY: -1,
      imageOffsetX: 0,
      imageOffsetY: 0,
    };
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onResize = this._onResize.bind(this);
    this.setState = this.setState.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousemove", this._onMouseMove);
    window.addEventListener("resize", this._onResize);
    if (!this.portalElement) {
      this.portalElement = document.createElement("div");
      document.body.appendChild(this.portalElement);
    }
    this._props = _extends(
      {
        ref: this.refs.image,
        size: this.props.size,
        smallImage: this.props.image,
        zoomImage: this.props.zoomImage,
        cursorOffset: this.props.cursorOffset,
        borderSize: this.props.borderSize,
        borderColor: this.props.borderColor,
        pointerStyle: this.props.pointerStyle,
        showPreview: this.props.showPreview,
        previewPosition: this.props.previewPosition,
        snapToPreview: this.props.snapToPreview,
        snapSmooth: this.props.snapSmooth,
        onClick: this._handleClick
      },
      this.state
    )
    const {         
      magnifierContainer,
      clear,
      updateVisibility,
      updateZoom
    } = Magnifier(this._props)
    
    this.clear = clear
    this.updateVisibility = updateVisibility
    this.updateZoom = updateZoom
    this.portalElement.appendChild(magnifierContainer)
    this.componentDidUpdate()
    this.updateVisibility(this._props)
    this.updateZoom(this._props, true)
  }
  componentWillUnmount() {
    this.clear && this.clear()
    document.removeEventListener("mousemove", this._onMouseMove);
    window.removeEventListener("resize", this._onResize);
    
    document.body.removeChild(this.portalElement);
    this.portalElement = null;
  }
  componentDidUpdate() {
    this._props = _extends(
      {
        ref: this.refs.image,
        size: this.props.size,
        smallImage: this.props.image,
        zoomImage: this.props.zoomImage,
        cursorOffset: this.props.cursorOffset,
        borderSize: this.props.borderSize,
        borderColor: this.props.borderColor,
        pointerStyle: this.props.pointerStyle,
        showPreview: this.props.showPreview,
        previewPosition: this.props.previewPosition,
        snapToPreview: this.props.snapToPreview,
        snapSmooth: this.props.snapSmooth,
        snapDelay: this.props.snapDelay,
        onClick: this._handleClick
      },
      this.state
    )
    this.updateVisibility && this.updateVisibility(this._props)
    this.updateZoom && this.updateZoom(this._props)
  }
  _onMouseMove(e) {
    var offset = getOffset(this.refs.image);

    var scrollX =
      window.pageXOffset !== undefined
        ? window.pageXOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollLeft;
    var scrollY =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;

    this.setState({
      clientX: e.clientX,
      clientY: e.clientY,
      x: e.clientX + scrollX, //(window.scrollX || window.pageXOffset),
      y: e.clientY + scrollY, //(window.scrollY || window.pageYOffset),
      offsetX: e.clientX - offset.x,
      offsetY: e.clientY - offset.y,
      imageOffsetX: offset.x,
      imageOffsetY: offset.y,
    });
  }
  _onResize() {
    var offset = getOffset(this.refs.image);
    var scrollX =
      window.pageXOffset !== undefined
        ? window.pageXOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollLeft;
    var scrollY =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;

    this.setState({
      x: this.state.clientX + scrollX, //(window.scrollX || window.pageXOffset),
      y: this.state.clientY + scrollY, //(window.scrollY || window.pageYOffset),
      offsetX: this.state.clientX - offset.x,
      offsetY: this.state.clientY - offset.y,
      imageOffsetX: offset.x,
      imageOffsetY: offset.y,
    });

    this._props = _extends(
      {
        ref: this.refs.image,
        size: this.props.size,
        smallImage: this.props.image,
        zoomImage: this.props.zoomImage,
        cursorOffset: this.props.cursorOffset,
        borderSize: this.props.borderSize,
        borderColor: this.props.borderColor,
        pointerStyle: this.props.pointerStyle,
        showPreview: this.props.showPreview,
        previewPosition: this.props.previewPosition,
        snapToPreview: this.props.snapToPreview,
        snapSmooth: this.props.snapSmooth,
        snapDelay: this.props.snapDelay,
        onClick: this._handleClick
      },
      this.state
    )
    this.updateVisibility && this.updateVisibility(this._props, true)
    this.updateZoom && this.updateZoom(this._props, true)
  }
  _handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <img
        ref="image"
        width={this.props.image.width}
        height={this.props.image.height}
        src={this.props.image.src}
        style={this.props.image.style}
      />
    );
  }
}

PointerZoom.displayName = "PointerZoom";

PointerZoom.propTypes = {
  // the size of the magnifier window
  size: PropTypes.number,
  // the offset of the zoom bubble from the cursor
  borderSize: PropTypes.string,
  borderColor: PropTypes.string,
  // show a triangle pointer next to cursor (useful with offset)
  pointerStyle: PropTypes.object,
  cursorOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  // the size of the non-zoomed-in image
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  }).isRequired,
  // the size of the zoomed-in image
  zoomImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func,
  // zoom preview
  showPreview: PropTypes.bool,
  previewPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  snapToPreview: PropTypes.bool,
  snapSmooth: PropTypes.number, // by default 1
  snapDelay: PropTypes.number, // by default 300 ms
  // additional styling
  containerStyle: PropTypes.object,
  magnifierContainerClassName: PropTypes.string,
  cursorZoomPointerClassName: PropTypes.string,
  cursorZoomMagnifierClassName: PropTypes.string,
};

PointerZoom.defaultProps = {
  size: 200,
  cursorOffset: { x: 0, y: 0 }
};

PointerZoom.portalElement = null;

export default PointerZoom;
