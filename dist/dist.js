(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AnalyticsAdapter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var AnalyticsAdapter = new function(){

    var dimensions = {};
    var enabled = true;
    var verbose = false;
    var logger = console;
    this.init = function(options) {
        if(options) {
            if(options.dimensions){
                dimensions = options.dimensions;
            }
            if(typeof(options.enabled) !== 'undefined'){
                enabled = options.enabled;
            }
            if(typeof(options.verbose) !== 'undefined'){
                verbose = options.verbose;
            }
            if(typeof(options.logger) !== 'undefined'){
                logger = options.logger;
            }
        }

        if(verbose){
            logger.log('Analytics', 'init', this);
        }
    };
    this.setId = function(id){
        if(id){
            if(verbose){
                logger.log('AnalyticsAdapter', 'set id', id);
            }

            if(enabled){
                ga('set', '&uid', id);
            }
        }
    };
    this.setDimension = function(dimensionObj){
        if(dimensionObj){
            var key, slot, value;
            for(key in dimensionObj){
                slot = dimensions[key];
                value = dimensionObj[key];

                if(verbose){
                    logger.log('AnalyticsAdapter', 'set dimension', slot, value);
                }

                if(enabled){
                    ga('set', 'dimension' + slot, value);
                }
            }
        }
    };
    this.trackPage = function(options){
        var properties = { 
            'hitType': 'pageview'
        };

        if(options.page){
            properties.page = options.page;
        }
        if(options.title){
            properties.title = options.title;
        }
        if(options.dimensions){
            var key, slot, value;
            for(key in options.dimensions){
                slot = dimensions[key];
                value = options.dimensions[key];
                properties['dimension' + slot] = value;
            }
        }

        if(verbose){
            logger.log('AnalyticsAdapter', 'track pageview', properties);
        }

        if(enabled){
            ga('send', properties);
        }
    };
    this.trackEvent = function(options){
        var properties = { 
            'hitType': 'event'
        };

        if(options.category){
            properties.eventCategory = options.category;
        }
        if(options.action){
            properties.eventAction = options.action;
        }
        if(options.label){
            properties.eventLabel = options.label;
        }
        if(options.value){
            properties.eventValue = options.value;
        }
        if(options.dimensions){
            var key, slot, value;
            for(key in options.dimensions){
                slot = dimensions[key];
                value = options.dimensions[key];
                properties['dimension' + slot] = value;
            }
        }

        if(verbose){
            logger.log('AnalyticsAdapter', 'track event', properties);
        }

        if(enabled){
            ga('send', properties);
        }
    };

    return this;
}

module.exports = AnalyticsAdapter;
},{}]},{},[1])(1)
});