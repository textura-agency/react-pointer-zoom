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

class CursorZoom extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      offsetX: -1,
      offsetY: -1
    };
    this._onMouseMove = this._onMouseMove.bind(this);
    this.setState = this.setState.bind(this);
    this._handleClick = this._handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousemove", this._onMouseMove);
    if (!this.portalElement) {
      this.portalElement = document.createElement("div");
      document.body.appendChild(this.portalElement);
    }
    this._props = _extends(
      {
        size: this.props.size,
        smallImage: this.props.image,
        zoomImage: this.props.zoomImage,
        cursorOffset: this.props.cursorOffset,
        borderSize: this.props.borderSize,
        borderColor: this.props.borderColor,
        pointerStyle: this.props.pointerStyle,
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
  }
  componentWillUnmount() {
    this.clear && this.clear()
    document.removeEventListener("mousemove", this._onMouseMove);
    document.body.removeChild(this.portalElement);
    this.portalElement = null;
  }
  componentDidUpdate() {
    this._props = _extends(
      {
        size: this.props.size,
        smallImage: this.props.image,
        zoomImage: this.props.zoomImage,
        cursorOffset: this.props.cursorOffset,
        borderSize: this.props.borderSize,
        borderColor: this.props.borderColor,
        pointerStyle: this.props.pointerStyle,
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
      x: e.clientX + scrollX, //(window.scrollX || window.pageXOffset),
      y: e.clientY + scrollY, //(window.scrollY || window.pageYOffset),
      offsetX: e.clientX - offset.x,
      offsetY: e.clientY - offset.y
    });
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

CursorZoom.displayName = "CursorZoom";

CursorZoom.propTypes = {
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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  // the size of the zoomed-in image
  zoomImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func,
  // additional styling
  containerStyle: PropTypes.object,
  magnifierContainerClassName: PropTypes.string,
  cursorZoomPointerClassName: PropTypes.string,
  cursorZoomMagnifierClassName: PropTypes.string,
};

CursorZoom.defaultProps = {
  size: 200,
  cursorOffset: { x: 0, y: 0 }
};

CursorZoom.portalElement = null;

export default CursorZoom;
