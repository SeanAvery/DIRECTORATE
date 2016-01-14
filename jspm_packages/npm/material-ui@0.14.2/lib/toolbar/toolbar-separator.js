/* */ 
'use strict';
var _extends = Object.assign || function(target) {
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
Object.defineProperty(exports, "__esModule", {value: true});
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _stylePropable = require('../mixins/style-propable');
var _stylePropable2 = _interopRequireDefault(_stylePropable);
var _lightRawTheme = require('../styles/raw-themes/light-raw-theme');
var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
var _themeManager = require('../styles/theme-manager');
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
var ToolbarSeparator = _react2.default.createClass({
  displayName: 'ToolbarSeparator',
  propTypes: {
    className: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object
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
  getTheme: function getTheme() {
    return this.state.muiTheme.toolbar;
  },
  getSpacing: function getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },
  getStyles: function getStyles() {
    return {root: {
        backgroundColor: this.getTheme().separatorColor,
        display: 'inline-block',
        height: this.getSpacing().desktopGutterMore,
        marginLeft: this.getSpacing().desktopGutter,
        position: 'relative',
        top: (this.getTheme().height - this.getSpacing().desktopGutterMore) / 2,
        width: 1
      }};
  },
  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var style = _props.style;
    var other = _objectWithoutProperties(_props, ['className', 'style']);
    var styles = this.getStyles();
    return _react2.default.createElement('span', _extends({}, other, {
      className: className,
      style: this.prepareStyles(styles.root, style)
    }));
  }
});
exports.default = ToolbarSeparator;
module.exports = exports['default'];
