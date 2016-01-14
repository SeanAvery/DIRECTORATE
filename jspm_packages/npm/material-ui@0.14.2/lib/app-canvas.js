/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _stylePropable = require('./mixins/style-propable');
var _stylePropable2 = _interopRequireDefault(_stylePropable);
var _lightRawTheme = require('./styles/raw-themes/light-raw-theme');
var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
var _themeManager = require('./styles/theme-manager');
var _themeManager2 = _interopRequireDefault(_themeManager);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var AppCanvas = _react2.default.createClass({
  displayName: 'AppCanvas',
  propTypes: {children: _react2.default.PropTypes.node},
  contextTypes: {muiTheme: _react2.default.PropTypes.object},
  childContextTypes: {muiTheme: _react2.default.PropTypes.object},
  mixins: [_stylePropable2.default],
  getInitialState: function getInitialState() {
    return {muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)};
  },
  getChildContext: function getChildContext() {
    return {muiTheme: this.state.muiTheme};
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },
  render: function render() {
    var _this = this;
    var styles = {
      height: '100%',
      backgroundColor: this.state.muiTheme.rawTheme.palette.canvasColor,
      direction: 'ltr'
    };
    var newChildren = _react2.default.Children.map(this.props.children, function(currentChild) {
      if (!currentChild) {
        return null;
      }
      switch (currentChild.type.displayName) {
        case 'AppBar':
          return _react2.default.cloneElement(currentChild, {style: _this.mergeStyles(currentChild.props.style, {position: 'fixed'})});
        default:
          return currentChild;
      }
    }, this);
    return _react2.default.createElement('div', {style: this.prepareStyles(styles)}, newChildren);
  }
});
exports.default = AppCanvas;
module.exports = exports['default'];