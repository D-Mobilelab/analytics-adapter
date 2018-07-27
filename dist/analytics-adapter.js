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
})({"Focm":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    dimensions: {},
    enabled: true,
    logger: {
        debug: function debug() {},
        log: function log() {},
        info: function info() {},
        warn: function warn() {},
        error: function error() {}
    },

    init: function init(options) {
        if (options) {
            if (options.dimensions) {
                this.dimensions = options.dimensions;
            }
            if (typeof options.enabled !== 'undefined') {
                this.enabled = options.enabled;
            }

            // get logger
            if (options.logger) {
                this.logger = options.logger;
            }
        }

        this.logger.log('Analytics', 'init', this);
    },

    setId: function setId(id) {
        if (id) {
            this.logger.log('AnalyticsAdapter', 'set id', id);

            if (this.enabled) {
                window.ga('set', '&uid', id);
            }
        }
    },

    setDimension: function setDimension(dimensionObj) {
        var key = void 0,
            slot = void 0,
            value = void 0;
        if (dimensionObj) {
            for (key in dimensionObj) {
                if (Object.prototype.hasOwnProperty.call(dimensionObj, key)) {
                    slot = this.dimensions[key];
                    value = dimensionObj[key];

                    this.logger.log('AnalyticsAdapter', 'set dimension', slot, value);

                    if (this.enabled) {
                        window.ga('set', 'dimension' + slot, value);
                    }
                }
            }
        }
    },

    trackPage: function trackPage(options) {
        var properties = {
            hitType: 'pageview'
        };
        var key = void 0,
            slot = void 0,
            value = void 0;

        if (options.page) {
            properties.page = options.page;
        }
        if (options.title) {
            properties.title = options.title;
        }
        if (options.dimensions) {
            for (key in options.dimensions) {
                if (Object.prototype.hasOwnProperty.call(options.dimensions, key)) {
                    slot = this.dimensions[key];
                    value = options.dimensions[key];
                    properties['dimension' + slot] = value;
                }
            }
        }

        this.logger.log('AnalyticsAdapter', 'track pageview', properties);

        if (this.enabled) {
            window.ga('send', properties);
        }
    },

    trackEvent: function trackEvent(options) {
        var properties = {
            hitType: 'event'
        };
        var key = void 0,
            slot = void 0,
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
            for (key in options.dimensions) {
                if (Object.prototype.hasOwnProperty.call(options.dimensions, key)) {
                    slot = this.dimensions[key];
                    value = options.dimensions[key];
                    properties['dimension' + slot] = value;
                }
            }
        }

        this.logger.log('AnalyticsAdapter', 'track event', properties);

        if (this.enabled) {
            window.ga('send', properties);
        }
    }
};
},{}]},{},["Focm"], null)