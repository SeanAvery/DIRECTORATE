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
var _tooltip = require('../tooltip');
var _tooltip2 = _interopRequireDefault(_tooltip);
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
var TableHeaderColumn = _react2.default.createClass({
  displayName: 'TableHeaderColumn',
  propTypes: {
    children: _react2.default.PropTypes.node,
    className: _react2.default.PropTypes.string,
    columnNumber: _react2.default.PropTypes.number,
    key: _react2.default.PropTypes.string,
    onClick: _react2.default.PropTypes.func,
    style: _react2.default.PropTypes.object,
    tooltip: _react2.default.PropTypes.string,
    tooltipStyle: _react2.default.PropTypes.object
  },
  contextTypes: {muiTheme: _react2.default.PropTypes.object},
  childContextTypes: {muiTheme: _react2.default.PropTypes.object},
  mixins: [_stylePropable2.default],
  getInitialState: function getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default),
      hovered: false
    };
  },
  getChildContext: function getChildContext() {
    return {muiTheme: this.state.muiTheme};
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },
  getTheme: function getTheme() {
    return this.state.muiTheme.tableHeaderColumn;
  },
  getStyles: function getStyles() {
    var theme = this.getTheme();
    var styles = {
      root: {
        fontWeight: 'normal',
        fontSize: 12,
        paddingLeft: theme.spacing,
        paddingRight: theme.spacing,
        height: theme.height,
        textAlign: 'left',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: this.getTheme().textColor,
        position: 'relative'
      },
      tooltip: {
        boxSizing: 'border-box',
        marginTop: theme.height / 2
      }
    };
    return styles;
  },
  _onMouseEnter: function _onMouseEnter() {
    if (this.props.tooltip !== undefined)
      this.setState({hovered: true});
  },
  _onMouseLeave: function _onMouseLeave() {
    if (this.props.tooltip !== undefined)
      this.setState({hovered: false});
  },
  _onClick: function _onClick(e) {
    if (this.props.onClick)
      this.props.onClick(e, this.props.columnNumber);
  },
  render: function render() {
    var styles = this.getStyles();
    var handlers = {
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onClick: this._onClick
    };
    var _props = this.props;
    var className = _props.className;
    var columnNumber = _props.columnNumber;
    var onClick = _props.onClick;
    var style = _props.style;
    var tooltip = _props.tooltip;
    var tooltipStyle = _props.tooltipStyle;
    var other = _objectWithoutProperties(_props, ['className', 'columnNumber', 'onClick', 'style', 'tooltip', 'tooltipStyle']);
    if (this.props.tooltip !== undefined) {
      tooltip = _react2.default.createElement(_tooltip2.default, {
        label: this.props.tooltip,
        show: this.state.hovered,
        style: this.mergeStyles(styles.tooltip, tooltipStyle)
      });
    }
    return _react2.default.createElement('th', _extends({
      key: this.props.key,
      className: className,
      style: this.prepareStyles(styles.root, style)
    }, handlers, other), tooltip, this.props.children);
  }
});
exports.default = TableHeaderColumn;
module.exports = exports['default'];
