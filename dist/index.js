// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"components/ScriptAppender.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var ScriptAppender = function ScriptAppender(_ref) {
  var condition = _ref.condition,
      src = _ref.src,
      parent = _ref.parent,
      onMount = _ref.onMount;
  // Check condition
  if (!condition) return null; // Check if script already exists

  var existingScript = parent.querySelector("script[src=\"".concat(src, "\"]"));

  if (!existingScript) {
    console.log('creating script');
    var script = document.createElement('script');
    script.id = 'myID1';
    script.src = src;

    if (!!onMount) {
      script.addEventListener('load', function () {
        return onMount(script);
      });
    }

    parent.appendChild(script);
  }

  return null;
};

var _default = ScriptAppender;
exports.default = _default;
},{}],"blocks/RaiselyDonationForm/styles.css":[function(require,module,exports) {

},{}],"blocks/RaiselyDonationForm/edit.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DonationFormEdit;

var _index = require("./index");

var _ScriptAppender = _interopRequireDefault(require("../../components/ScriptAppender"));

require("./styles.css");

var _excluded = ["attributes", "setAttributes"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * WordPress dependencies
 */
var __ = wp.i18n.__;
var _wp$element = wp.element,
    useEffect = _wp$element.useEffect,
    useState = _wp$element.useState,
    useRef = _wp$element.useRef,
    useCallback = _wp$element.useCallback;
var apiFetch = wp.apiFetch;
var _wp$blockEditor = wp.blockEditor,
    BlockIcon = _wp$blockEditor.BlockIcon,
    BlockControls = _wp$blockEditor.BlockControls;
var _wp$components = wp.components,
    Placeholder = _wp$components.Placeholder,
    Button = _wp$components.Button,
    SelectControl = _wp$components.SelectControl,
    Spinner = _wp$components.Spinner,
    ToolbarButton = _wp$components.ToolbarButton,
    ToolbarGroup = _wp$components.ToolbarGroup;

function DonationFormEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      props = _objectWithoutProperties(_ref, _excluded);

  var campaignPath = attributes.campaignPath;
  var icon = _index.metadata.icon,
      title = _index.metadata.title;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      campaignsList = _useState6[0],
      setCampaignsList = _useState6[1];

  var _useState7 = useState(campaignPath),
      _useState8 = _slicedToArray(_useState7, 2),
      embedCampaignPath = _useState8[0],
      setCampaignPath = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      iframeLoaded = _useState10[0],
      setIframeLoaded = _useState10[1];

  var _useState11 = useState(!!campaignPath),
      _useState12 = _slicedToArray(_useState11, 2),
      preview = _useState12[0],
      setPreview = _useState12[1];

  var _useState13 = useState(null),
      _useState14 = _slicedToArray(_useState13, 2),
      formWrapper = _useState14[0],
      setFormWrapper = _useState14[1];

  var formWrapperRef = useCallback(setFormWrapper, []);
  var isIframeLoaded = useRef(null);
  var isStillMounted = useRef();
  useEffect(function () {
    var _window$raiselyBlocks;

    isStillMounted.current = true;

    if ((_window$raiselyBlocks = window.raiselyBlocks) !== null && _window$raiselyBlocks !== void 0 && _window$raiselyBlocks.nonce) {
      apiFetch.use(apiFetch.createNonceMiddleware(window.raiselyBlocks.nonce));
    }

    apiFetch({
      path: "/raisely/v1/campaigns-list"
    }).then(function (res) {
      if (isStillMounted.current) {
        setLoading(false);

        if (res.auth) {
          setCampaignsList(res.data);
        } else {
          var _window, _window$raiselyBlocks2;

          setError( /*#__PURE__*/React.createElement("span", null, "Setup your connection with Raisely on the ", /*#__PURE__*/React.createElement("a", {
            href: (_window = window) === null || _window === void 0 ? void 0 : (_window$raiselyBlocks2 = _window.raiselyBlocks) === null || _window$raiselyBlocks2 === void 0 ? void 0 : _window$raiselyBlocks2.settingsPage,
            target: "_blank"
          }, "Raisely Settings page"), " to retrieve a list of your Raisely campaigns."));
        }
      }
    }).catch(function (e) {
      if (isStillMounted.current) {
        console.error(e);
        setCampaignsList([]);
        setLoading(false);
        setError("Oops... Something went wrong. Please try again later.");
      }
    });
    return function () {
      isStillMounted.current = false;

      if (isIframeLoaded.current) {
        clearInterval(isIframeLoaded.current);
      }
    };
  }, []);

  var onScriptMount = function onScriptMount() {
    var iframeLoadedInterval = setInterval(function () {
      var iframe = formWrapper.querySelector('iframe');

      if (!!iframe) {
        // Set on load events
        if (iframe.attachEvent) {
          iframe.attachEvent("onload", function () {
            setIframeLoaded(true);
          });
        } else {
          iframe.onload = function () {
            setIframeLoaded(true);
          };
        }

        iframe.style.pointerEvents = 'none';
        clearInterval(isIframeLoaded.current);
        isIframeLoaded.current = null;
      }
    }, 1000);
    isIframeLoaded.current = iframeLoadedInterval;
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockControls, null, /*#__PURE__*/React.createElement(ToolbarGroup, null, preview && /*#__PURE__*/React.createElement(ToolbarButton, {
    className: "components-toolbar__control",
    label: __('Edit URL'),
    icon: 'edit',
    onClick: function onClick() {
      return setPreview(false);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    class: "wp-raisely-block-donation-form"
  }, !preview ? /*#__PURE__*/React.createElement(Placeholder, {
    icon: /*#__PURE__*/React.createElement(BlockIcon, {
      icon: icon,
      showColors: true
    }),
    label: "".concat(title, " Campaign"),
    className: "wp-block-embed",
    instructions: __('Raisely Campaign you wish to embed')
  }, loading ? /*#__PURE__*/React.createElement(Spinner, null) : error ? /*#__PURE__*/React.createElement("p", null, error) : !campaignsList.length ? /*#__PURE__*/React.createElement("p", null, "There are no campaigns to select from.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SelectControl, {
    className: "raisely-placeholder__input",
    value: campaignPath,
    onChange: function onChange(value) {
      return setCampaignPath(value);
    },
    options: campaignsList.map(function (_ref2) {
      var path = _ref2.path,
          name = _ref2.name;
      return {
        value: path,
        label: name
      };
    })
  }), /*#__PURE__*/React.createElement(Button, {
    className: "is-primary",
    onClick: function onClick() {
      console.log({
        embedCampaignPath: embedCampaignPath
      });
      setAttributes({
        campaignPath: embedCampaignPath
      });
      setPreview(true);
    }
  }, "Embed"))) : /*#__PURE__*/React.createElement("div", {
    id: "raisely-donate",
    "data-campaign-path": campaignPath,
    "data-width": "100%",
    "data-height": "800",
    ref: formWrapperRef
  }, !iframeLoaded && /*#__PURE__*/React.createElement(Spinner, null), /*#__PURE__*/React.createElement(_ScriptAppender.default, {
    condition: !!formWrapper,
    src: "https://cdn.raisely.com/v3/public/embed.js",
    parent: formWrapper,
    onMount: onScriptMount
  }))));
}
},{"./index":"blocks/RaiselyDonationForm/index.js","../../components/ScriptAppender":"components/ScriptAppender.jsx","./styles.css":"blocks/RaiselyDonationForm/styles.css"}],"blocks/RaiselyDonationForm/save.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DonationFormSave;

function DonationFormSave() {
  return /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", null, "Here is a donation form"));
}
},{}],"blocks/RaiselyDonationForm/icon.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logo = void 0;

/**
 * WordPress dependencies
 */
var _wp$primitives = wp.primitives,
    SVG = _wp$primitives.SVG,
    Path = _wp$primitives.Path;
var logo = /*#__PURE__*/React.createElement(SVG, {
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 152 152"
}, /*#__PURE__*/React.createElement(Path, {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M34.2 123.5l41.9-47.3 41.7 47.4a63.22 63.22 0 01-41.7 15.8c-16.1-.1-30.8-6.1-41.9-15.9zM76 12.7c34.9 0 63.3 28.4 63.3 63.3 0 14.4-4.8 27.6-12.9 38.3L76.1 57.1l-50.6 57.1c-8-10.6-12.8-23.8-12.8-38.2 0-34.9 28.4-63.3 63.3-63.3zM76 0C34.1 0 0 34.1 0 76s34.1 76 76 76 76-34.1 76-76S117.9 0 76 0z",
  fill: "#6138D8"
}));
exports.logo = logo;
},{}],"blocks/RaiselyDonationForm/block.json":[function(require,module,exports) {
module.exports = {
  "apiVersion": 2,
  "name": "raisely/donation-form",
  "title": "Raisely Donation Form",
  "category": "embed",
  "description": "Displays a Raisely campaign donation form.",
  "keywords": ["recent content"],
  "textdomain": "default",
  "attributes": {
    "campaignPath": {
      "type": "string"
    }
  },
  "supports": {
    "align": false,
    "html": false,
    "className": false
  }
};
},{}],"blocks/RaiselyDonationForm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "metadata", {
  enumerable: true,
  get: function () {
    return _block.default;
  }
});
exports.settings = exports.name = void 0;

var _edit = _interopRequireDefault(require("./edit"));

var _save = _interopRequireDefault(require("./save"));

var _icon = require("./icon");

var _block = _interopRequireDefault(require("./block.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Internal dependencies
 */
var name = _block.default.name;
exports.name = name;
var settings = {
  icon: _icon.logo,
  example: {},
  edit: _edit.default // save

};
exports.settings = settings;
},{"./edit":"blocks/RaiselyDonationForm/edit.jsx","./save":"blocks/RaiselyDonationForm/save.jsx","./icon":"blocks/RaiselyDonationForm/icon.jsx","./block.json":"blocks/RaiselyDonationForm/block.json"}],"index.js":[function(require,module,exports) {
"use strict";

var RaiselyDonationForm = _interopRequireWildcard(require("./blocks/RaiselyDonationForm"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var registerBlockType = wp.blocks.registerBlockType;
/**
 * Function to register an individual block.
 *
 * @param {Object} block The block to be registered.
 *
 */

var registerBlock = function registerBlock(block) {
  if (!block) {
    return;
  }

  var metadata = block.metadata,
      settings = block.settings,
      name = block.name;
  registerBlockType(name, Object.assign(metadata, settings));
};

[RaiselyDonationForm].forEach(registerBlock);
},{"./blocks/RaiselyDonationForm":"blocks/RaiselyDonationForm/index.js"}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map