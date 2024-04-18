"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _magnifier = require("./magnifier");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var _extends = Object.assign || function (target) {
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
    x += el.offsetLeft - (el.tagName === "BODY" ? window.pageXOffset : el.scrollLeft);
    y += el.offsetTop - (el.tagName === "BODY" ? window.pageYOffset : el.scrollTop);
    el = el.offsetParent;
  }
  return {
    x: x,
    y: y
  };
}
var PointerZoom = /*#__PURE__*/function (_React$Component) {
  function PointerZoom() {
    var _this;
    _classCallCheck(this, PointerZoom);
    _this = _callSuper(this, PointerZoom);
    _this.state = {
      clientX: 0,
      clientY: 0,
      x: 0,
      y: 0,
      offsetX: -1,
      offsetY: -1,
      imageOffsetX: 0,
      imageOffsetY: 0
    };
    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this.setState = _this.setState.bind(_this);
    _this._handleClick = _this._handleClick.bind(_this);
    return _this;
  }
  _inherits(PointerZoom, _React$Component);
  return _createClass(PointerZoom, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("mousemove", this._onMouseMove);
      window.addEventListener("resize", this._onResize);
      if (!this.portalElement) {
        this.portalElement = document.createElement("div");
        document.body.appendChild(this.portalElement);
      }
      this._props = _extends({
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
      }, this.state);
      var _Magnifier = (0, _magnifier.Magnifier)(this._props),
        magnifierContainer = _Magnifier.magnifierContainer,
        clear = _Magnifier.clear,
        updateVisibility = _Magnifier.updateVisibility,
        updateZoom = _Magnifier.updateZoom;
      this.clear = clear;
      this.updateVisibility = updateVisibility;
      this.updateZoom = updateZoom;
      this.portalElement.appendChild(magnifierContainer);
      this.componentDidUpdate();
      this.updateVisibility(this._props);
      this.updateZoom(this._props, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clear && this.clear();
      document.removeEventListener("mousemove", this._onMouseMove);
      window.removeEventListener("resize", this._onResize);
      document.body.removeChild(this.portalElement);
      this.portalElement = null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._props = _extends({
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
      }, this.state);
      this.updateVisibility && this.updateVisibility(this._props);
      this.updateZoom && this.updateZoom(this._props);
    }
  }, {
    key: "_onMouseMove",
    value: function _onMouseMove(e) {
      var offset = getOffset(this.refs.image);
      var scrollX = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      this.setState({
        clientX: e.clientX,
        clientY: e.clientY,
        x: e.clientX + scrollX,
        //(window.scrollX || window.pageXOffset),
        y: e.clientY + scrollY,
        //(window.scrollY || window.pageYOffset),
        offsetX: e.clientX - offset.x,
        offsetY: e.clientY - offset.y,
        imageOffsetX: offset.x,
        imageOffsetY: offset.y
      });
    }
  }, {
    key: "_onResize",
    value: function _onResize() {
      var offset = getOffset(this.refs.image);
      var scrollX = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
      var scrollY = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      this.setState({
        x: this.state.clientX + scrollX,
        //(window.scrollX || window.pageXOffset),
        y: this.state.clientY + scrollY,
        //(window.scrollY || window.pageYOffset),
        offsetX: this.state.clientX - offset.x,
        offsetY: this.state.clientY - offset.y,
        imageOffsetX: offset.x,
        imageOffsetY: offset.y
      });
      this._props = _extends({
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
      }, this.state);
      this.updateVisibility && this.updateVisibility(this._props, true);
      this.updateZoom && this.updateZoom(this._props, true);
    }
  }, {
    key: "_handleClick",
    value: function _handleClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("img", {
        ref: "image",
        width: this.props.image.width,
        height: this.props.image.height,
        src: this.props.image.src,
        style: this.props.image.style
      });
    }
  }]);
}(_react["default"].Component);
PointerZoom.displayName = "PointerZoom";
PointerZoom.propTypes = {
  // the size of the magnifier window
  size: _propTypes["default"].number,
  // the offset of the zoom bubble from the cursor
  borderSize: _propTypes["default"].string,
  borderColor: _propTypes["default"].string,
  // show a triangle pointer next to cursor (useful with offset)
  pointerStyle: _propTypes["default"].object,
  cursorOffset: _propTypes["default"].shape({
    x: _propTypes["default"].number.isRequired,
    y: _propTypes["default"].number.isRequired
  }),
  // the size of the non-zoomed-in image
  image: _propTypes["default"].shape({
    src: _propTypes["default"].string.isRequired,
    width: _propTypes["default"].number,
    height: _propTypes["default"].number
  }).isRequired,
  // the size of the zoomed-in image
  zoomImage: _propTypes["default"].shape({
    src: _propTypes["default"].string.isRequired,
    width: _propTypes["default"].number.isRequired,
    height: _propTypes["default"].number.isRequired
  }).isRequired,
  onClick: _propTypes["default"].func,
  // zoom preview
  showPreview: _propTypes["default"].bool,
  previewPosition: _propTypes["default"].shape({
    x: _propTypes["default"].number,
    y: _propTypes["default"].number
  }),
  snapToPreview: _propTypes["default"].bool,
  snapSmooth: _propTypes["default"].number,
  // by default 1
  snapDelay: _propTypes["default"].number,
  // by default 300 ms
  // additional styling
  containerStyle: _propTypes["default"].object,
  magnifierContainerClassName: _propTypes["default"].string,
  cursorZoomPointerClassName: _propTypes["default"].string,
  cursorZoomMagnifierClassName: _propTypes["default"].string
};
PointerZoom.defaultProps = {
  size: 200,
  cursorOffset: {
    x: 0,
    y: 0
  }
};
PointerZoom.portalElement = null;
var _default = exports["default"] = PointerZoom;