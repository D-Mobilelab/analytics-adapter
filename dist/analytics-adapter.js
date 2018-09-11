// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"xFa0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    ga: window.ga,
    dimensions: {},
    enabled: true,
    logger: {
        debug: function debug() {},
        log: function log() {},
        info: function info() {},
        warn: function warn() {},
        error: function error() {}
    }
};
},{}],"bKXP":[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
    if (options) {
        if (options.ga) {
            _global2.default.ga = options.ga;
        }

        if (options.dimensions) {
            _global2.default.dimensions = options.dimensions;
        }
        if (typeof options.enabled !== 'undefined') {
            _global2.default.enabled = options.enabled === true || options.enabled === 'true' || options.enabled === 1 || options.enabled === '1';
        }

        if (options.logger) {
            _global2.default.logger = options.logger;
        }
    }

    _global2.default.logger.log('AnalyticsAdapter', 'init', _global2.default);
}; /**
    * @memberof AnalyticsAdapter
    * @function init
    * @description Initialize Analytics and set up the general configurations.
    * @param {Object} options (see attributes below)
    * @param {boolean} [options.enabled=true] enable/disable tracking on Google Analytics
    * @param {Object} [options.logger=Object()] logging methods to use (see example below),
    * if undefined there will be no logs
    * @param {Object[]} [options.dimensions=Object()]
    * @param options.dimensions[].key - custom dimensions name
    * @param options.dimensions[].value - custom dimensions value
    *
    * @example
    * // Logger
    * // Analytics with console as logger
    *  AnalyticsAdapter.init({
    *      enabled: true,
    *      logger: console,
    *      dimensions: {
    *          'UserStatus': 1,
    *          'AccessType': 2,
    *          'Valuable': 5,
    *          'Action': 8,
    *          'PaymentType': 11
    *      }
    *  });
    *
    * @example
    * // Analytics with no logs
    *  AnalyticsAdapter.init({
    *      enabled: true,
    *      dimensions: {
    *          'UserStatus': 1,
    *          'AccessType': 2,
    *          'Valuable': 5,
    *          'Action': 8,
    *          'PaymentType': 11
    *      }
    *  });
    *
    * @example
    * // Custom Dimensions
    * // In analytics initialization phase, you have to define all custom dimensions
    * // that you will use in your applications.
    *
    * // Init method doesn't set custom dimension on Google Analytics, it only saves
    * // custom dimension for future use (for example in event tracking).
    *
    * // You have to pass a pair (custom dimension name, slot id), where slot id is the slot
    * // of the custom dimension assigned from Google Analytics before.
    *
    * // In this example, I set two custom dimensions ("UserStatus" with slot number 1
    * // and "Valuable" with slot number 5):
    * AnalyticsAdapter.init({
    *     enabled: true,
    *     dimensions: {
    *         'UserStatus' : 1,
    *         'Valuable' : 5
    *     }
    * });
    */
},{"../global":"xFa0"}],"Gf7A":[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (id) {
    if (id) {
        _global2.default.logger.log('AnalyticsAdapter', 'set id', id);

        if (_global2.default.enabled) {
            _global2.default.ga('set', '&uid', id);
        }
    }
}; /**
    * @memberof AnalyticsAdapter
    * @function setId
    * @description Set Analytics user id
    * @param {string} id - user id
    *
    * @example
    * AnalyticsAdapter.setId("123rgr");
    */
},{"../global":"xFa0"}],"oHgT":[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (dimensionObj) {
    var slot = void 0,
        value = void 0;
    if (dimensionObj) {
        Object.keys(dimensionObj).forEach(function (key) {
            slot = _global2.default.dimensions[key];
            value = dimensionObj[key];

            _global2.default.logger.log('AnalyticsAdapter', 'set dimension', slot, value);

            if (_global2.default.enabled) {
                _global2.default.ga('set', 'dimension' + slot, value);
            }
        });
    }
}; /**
    * @memberof AnalyticsAdapter
    * @function setDimension
    * @description Set a user/session (not hit) custom dimension.
    * @param {Object[]} dimensions
    * @param dimensions[].key - custom dimensions name
    * @param dimensions[].value - custom dimensions value
    *
    * @example
    * // The custom dimension has to be defined in init method before
    * // and, after, you have to use the same custom dimension name.
    *
    * // For example, in the following code, I set UserStatus on slot number 1 and
    * // assign it the logged value:
    *
    * // before, I save UserStatus custom dimension with slot "1"
    * Analytics.init({
    *     dimensions: {
    *         'UserStatus' : 1
    *     }
    * });
    *
    * // after, I set custom dimension with the logged value:
    * AnalyticsAdapter.setDimension({
    *     'UserStatus' : 'logged'
    * });
    */
},{"../global":"xFa0"}],"kYnV":[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
    var properties = {
        hitType: 'pageview'
    };
    var slot = void 0,
        value = void 0;

    if (options.page) {
        properties.page = options.page;
    }
    if (options.title) {
        properties.title = options.title;
    }
    if (options.dimensions) {
        Object.keys(options.dimensions).forEach(function (key) {
            slot = _global2.default.dimensions[key];
            value = options.dimensions[key];
            properties['dimension' + slot] = value;
        });
    }

    _global2.default.logger.log('AnalyticsAdapter', 'track pageview', properties);

    if (_global2.default.enabled) {
        _global2.default.ga('send', properties);
    }
}; /**
    * @memberof AnalyticsAdapter
    * @function trackPage
    * @description Track pageview events with optional custom dimensions
    * @param {Object} options - The trackPage options
    * @param {string} options.page - The page name
    * @param {string} options.title - The page title
    * @param {Object[]} options.dimensions
    * @param options.dimensions[].key - custom dimensions name
    * @param options.dimensions[].value - custom dimensions value
    *
    * @example
    * // Note: the custom dimension (in this example Valuable)
    * // has to be defined in the init method first and you have to use the same custom dimension name.
    * AnalyticsAdapter.trackPage({
    *     page: '/home',
    *     title: 'Home Page',
    *     dimensions: {
    *         dimensionOne: 'logged',
    *         dimensionFour: 'premium',
    *     }
    * });
    */
},{"../global":"xFa0"}],"uZ87":[function(require,module,exports) {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _global = require('../global');

var _global2 = _interopRequireDefault(_global);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
    var properties = {
        hitType: 'event'
    };
    var slot = void 0,
        value = void 0;

    if (options.category) {
        properties.eventCategory = options.category;
    }
    if (options.action) {
        properties.eventAction = options.action;
    }
    if (options.label) {
        properties.eventLabel = options.label;
    }
    if (options.value) {
        properties.eventValue = options.value;
    }
    if (options.dimensions) {
        Object.keys(options.dimensions).forEach(function (key) {
            slot = _global2.default.dimensions[key];
            value = options.dimensions[key];
            properties['dimension' + slot] = value;
        });
    }

    _global2.default.logger.log('AnalyticsAdapter', 'track event', properties);

    if (_global2.default.enabled) {
        _global2.default.ga('send', properties);
    }
}; /**
    * @memberof AnalyticsAdapter
    * @function trackEvent
    * @description Track an event
    * @param {Object} options (see attributes below)
    * @param {string} options.category event category
    * @param {string} options.action event action
    * @param {string} options.label event label
    * @param {number} options.value event value
    * @param {Object[]} options.dimensions
    * @param options.dimensions[].key - custom dimensions name
    * @param options.dimensions[].value - custom dimensions value
    *
    * @example
    * // Note: the custom dimension (in this example Valuable)
    * // has to be defined in the init method first and you have to use the same custom dimension name.
    * AnalyticsAdapter.trackPage({
    *     category: 'UI',
    *     action: 'open',
    *     label: 'menu',
    *     value: 7,
    *     dimensions: {
    *         'Valuable': 'yes'
    *     }
    * });
    */
},{"../global":"xFa0"}],"Focm":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _init = require('./init/init');

var _init2 = _interopRequireDefault(_init);

var _setId = require('./setId/setId');

var _setId2 = _interopRequireDefault(_setId);

var _setDimension = require('./setDimension/setDimension');

var _setDimension2 = _interopRequireDefault(_setDimension);

var _trackPage = require('./trackPage/trackPage');

var _trackPage2 = _interopRequireDefault(_trackPage);

var _trackEvent = require('./trackEvent/trackEvent');

var _trackEvent2 = _interopRequireDefault(_trackEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
   * @see modules/init
   */
  init: _init2.default,
  /**
   * @see modules/setId
   */
  setId: _setId2.default,
  /**
   * @see modules/setDimension
   */
  setDimension: _setDimension2.default,
  /**
   * @see modules/trackPage
   */
  trackPage: _trackPage2.default,
  /**
   * @see modules/trackEvent
   */
  trackEvent: _trackEvent2.default
}; /**
    * @class AnalyticsAdapter
    * @description Adapter for Google Analytics
    */
},{"./init/init":"bKXP","./setId/setId":"Gf7A","./setDimension/setDimension":"oHgT","./trackPage/trackPage":"kYnV","./trackEvent/trackEvent":"uZ87"}]},{},["Focm"], null)