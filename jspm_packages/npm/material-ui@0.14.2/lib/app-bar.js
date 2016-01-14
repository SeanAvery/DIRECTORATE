/* */ 
(function(process) {
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
  var _stylePropable = require('./mixins/style-propable');
  var _stylePropable2 = _interopRequireDefault(_stylePropable);
  var _typography = require('./styles/typography');
  var _typography2 = _interopRequireDefault(_typography);
  var _iconButton = require('./icon-button');
  var _iconButton2 = _interopRequireDefault(_iconButton);
  var _menu = require('./svg-icons/navigation/menu');
  var _menu2 = _interopRequireDefault(_menu);
  var _lightRawTheme = require('./styles/raw-themes/light-raw-theme');
  var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);
  var _themeManager = require('./styles/theme-manager');
  var _themeManager2 = _interopRequireDefault(_themeManager);
  var _paper = require('./paper');
  var _paper2 = _interopRequireDefault(_paper);
  var _propTypes = require('./utils/prop-types');
  var _propTypes2 = _interopRequireDefault(_propTypes);
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
  var AppBar = _react2.default.createClass({
    displayName: 'AppBar',
    propTypes: {
      children: _react2.default.PropTypes.node,
      className: _react2.default.PropTypes.string,
      iconClassNameLeft: _react2.default.PropTypes.string,
      iconClassNameRight: _react2.default.PropTypes.string,
      iconElementLeft: _react2.default.PropTypes.element,
      iconElementRight: _react2.default.PropTypes.element,
      iconStyleRight: _react2.default.PropTypes.object,
      onLeftIconButtonTouchTap: _react2.default.PropTypes.func,
      onRightIconButtonTouchTap: _react2.default.PropTypes.func,
      onTitleTouchTap: _react2.default.PropTypes.func,
      showMenuIconButton: _react2.default.PropTypes.bool,
      style: _react2.default.PropTypes.object,
      title: _react2.default.PropTypes.node,
      titleStyle: _react2.default.PropTypes.object,
      zDepth: _propTypes2.default.zDepth
    },
    contextTypes: {muiTheme: _react2.default.PropTypes.object},
    childContextTypes: {muiTheme: _react2.default.PropTypes.object},
    mixins: [_stylePropable2.default],
    getDefaultProps: function getDefaultProps() {
      return {
        showMenuIconButton: true,
        title: '',
        zDepth: 1
      };
    },
    getInitialState: function getInitialState() {
      return {muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)};
    },
    getChildContext: function getChildContext() {
      return {muiTheme: this.state.muiTheme};
    },
    componentDidMount: function componentDidMount() {
      if (process.env.NODE_ENV !== 'production') {
        if (this.props.iconElementLeft && this.props.iconClassNameLeft) {
          console.warn('Properties iconClassNameLeft and iconElementLeft cannot be simultaneously ' + 'defined. Please use one or the other.');
        }
        if (this.props.iconElementRight && this.props.iconClassNameRight) {
          console.warn('Properties iconClassNameRight and iconElementRight cannot be simultaneously ' + 'defined. Please use one or the other.');
        }
      }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
      var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
      this.setState({muiTheme: newMuiTheme});
    },
    getStyles: function getStyles() {
      var muiTheme = this.state.muiTheme;
      var rawTheme = muiTheme.rawTheme;
      var themeVariables = muiTheme.appBar;
      var iconButtonSize = muiTheme.button.iconButtonSize;
      var flatButtonSize = 36;
      var styles = {
        root: {
          position: 'relative',
          zIndex: muiTheme.zIndex.appBar,
          width: '100%',
          display: 'flex',
          minHeight: themeVariables.height,
          backgroundColor: themeVariables.color,
          paddingLeft: rawTheme.spacing.desktopGutter,
          paddingRight: rawTheme.spacing.desktopGutter
        },
        title: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          margin: 0,
          paddingTop: 0,
          letterSpacing: 0,
          fontSize: 24,
          fontWeight: _typography2.default.fontWeightNormal,
          color: themeVariables.textColor,
          lineHeight: themeVariables.height + 'px'
        },
        mainElement: {
          boxFlex: 1,
          flex: '1'
        },
        iconButton: {
          style: {
            marginTop: (themeVariables.height - iconButtonSize) / 2,
            marginRight: 8,
            marginLeft: -16
          },
          iconStyle: {
            fill: themeVariables.textColor,
            color: themeVariables.textColor
          }
        },
        flatButton: {
          color: themeVariables.textColor,
          marginTop: (iconButtonSize - flatButtonSize) / 2 + 2
        }
      };
      return styles;
    },
    _onLeftIconButtonTouchTap: function _onLeftIconButtonTouchTap(event) {
      if (this.props.onLeftIconButtonTouchTap) {
        this.props.onLeftIconButtonTouchTap(event);
      }
    },
    _onRightIconButtonTouchTap: function _onRightIconButtonTouchTap(event) {
      if (this.props.onRightIconButtonTouchTap) {
        this.props.onRightIconButtonTouchTap(event);
      }
    },
    _onTitleTouchTap: function _onTitleTouchTap(event) {
      if (this.props.onTitleTouchTap) {
        this.props.onTitleTouchTap(event);
      }
    },
    render: function render() {
      var _props = this.props;
      var title = _props.title;
      var titleStyle = _props.titleStyle;
      var iconStyleRight = _props.iconStyleRight;
      var showMenuIconButton = _props.showMenuIconButton;
      var iconElementLeft = _props.iconElementLeft;
      var iconElementRight = _props.iconElementRight;
      var iconClassNameLeft = _props.iconClassNameLeft;
      var iconClassNameRight = _props.iconClassNameRight;
      var className = _props.className;
      var style = _props.style;
      var zDepth = _props.zDepth;
      var children = _props.children;
      var other = _objectWithoutProperties(_props, ['title', 'titleStyle', 'iconStyleRight', 'showMenuIconButton', 'iconElementLeft', 'iconElementRight', 'iconClassNameLeft', 'iconClassNameRight', 'className', 'style', 'zDepth', 'children']);
      var menuElementLeft = undefined;
      var menuElementRight = undefined;
      var styles = this.getStyles();
      var iconRightStyle = this.mergeStyles(styles.iconButton.style, {
        marginRight: -16,
        marginLeft: 'auto'
      }, iconStyleRight);
      var titleElement = undefined;
      if (title) {
        titleElement = typeof title === 'string' || title instanceof String ? _react2.default.createElement('h1', {
          onTouchTap: this._onTitleTouchTap,
          style: this.prepareStyles(styles.title, styles.mainElement, titleStyle)
        }, title) : _react2.default.createElement('div', {
          onTouchTap: this._onTitleTouchTap,
          style: this.prepareStyles(styles.title, styles.mainElement, titleStyle)
        }, title);
      }
      if (showMenuIconButton) {
        if (iconElementLeft) {
          switch (iconElementLeft.type.displayName) {
            case 'IconButton':
              iconElementLeft = _react2.default.cloneElement(iconElementLeft, {iconStyle: this.mergeStyles(styles.iconButton.iconStyle, iconElementLeft.props.iconStyle)});
              break;
          }
          menuElementLeft = _react2.default.createElement('div', {style: this.prepareStyles(styles.iconButton.style)}, iconElementLeft);
        } else {
          var child = iconClassNameLeft ? '' : _react2.default.createElement(_menu2.default, {style: this.mergeStyles(styles.iconButton.iconStyle)});
          menuElementLeft = _react2.default.createElement(_iconButton2.default, {
            style: this.mergeStyles(styles.iconButton.style),
            iconStyle: this.mergeStyles(styles.iconButton.iconStyle),
            iconClassName: iconClassNameLeft,
            onTouchTap: this._onLeftIconButtonTouchTap
          }, child);
        }
      }
      if (iconElementRight) {
        switch (iconElementRight.type.displayName) {
          case 'IconMenu':
          case 'IconButton':
            iconElementRight = _react2.default.cloneElement(iconElementRight, {iconStyle: this.mergeStyles(styles.iconButton.iconStyle, iconElementRight.props.iconStyle)});
            break;
          case 'FlatButton':
            iconElementRight = _react2.default.cloneElement(iconElementRight, {style: this.mergeStyles(styles.flatButton, iconElementRight.props.style)});
            break;
        }
        menuElementRight = _react2.default.createElement('div', {style: this.prepareStyles(iconRightStyle)}, iconElementRight);
      } else if (iconClassNameRight) {
        menuElementRight = _react2.default.createElement(_iconButton2.default, {
          style: iconRightStyle,
          iconStyle: this.mergeStyles(styles.iconButton.iconStyle),
          iconClassName: iconClassNameRight,
          onTouchTap: this._onRightIconButtonTouchTap
        });
      }
      return _react2.default.createElement(_paper2.default, _extends({}, other, {
        rounded: false,
        className: className,
        style: this.mergeStyles(styles.root, style),
        zDepth: zDepth
      }), menuElementLeft, titleElement, menuElementRight, children);
    }
  });
  exports.default = AppBar;
  module.exports = exports['default'];
})(require('process'));
