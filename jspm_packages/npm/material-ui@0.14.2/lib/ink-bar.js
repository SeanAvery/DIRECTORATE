/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _transitions = require('./styles/transitions');
var _transitions2 = _interopRequireDefault(_transitions);
var _stylePropable = require('./mixins/style-propable');
var _stylePropable2 = _interopRequireDefault(_stylePropable);
var _lightRawTheme = require('./styles/raw-themes/light-raw-theme');
var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
var _themeManager = require('./styles/theme-manager');
var _themeManager2 = _interopRequireDefault(_themeManager);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
}
var InkBar = _react2.default.createClass({
  displayName: 'InkBar',
  propTypes: {
    color: _react2.default.PropTypes.string,
    left: _react2.default.PropTypes.string.isRequired,
    style: _react2.default.PropTypes.object,
    width: _react2.default.PropTypes.string.isRequired
  },
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
    var _props = this.props;
    var color = _props.color;
    var left = _props.left;
    var width = _props.width;
    var style = _props.style;
    var other = _objectWithoutProperties(_props, ['color', 'left', 'width', 'style']);
    var colorStyle = color ? {backgroundColor: color} : undefined;
    var styles = this.prepareStyles({
      left: left,
      width: width,
      bottom: 0,
      display: 'block',
      backgroundColor: this.state.muiTheme.inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: _transitions2.default.easeOut('1s', 'left')
    }, this.props.style, colorStyle);
    return _react2.default.createElement('div', {style: styles}, ' ');
  }
});
exports.default = InkBar;
module.exports = exports['default'];
