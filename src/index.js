module.exports = new function(){

    var dimensions = {};
    var enabled = true;
    var logger = { 
        debug: function(){},
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    this.init = function(options) {
        if(options) {
            if(options.dimensions){
                dimensions = options.dimensions;
            }
            if(typeof options.enabled !== 'undefined'){
                enabled = options.enabled;
            }

            // get logger
            if (options.logger){
                logger = options.logger;
            }
        }

        logger.log('Analytics', 'init', this);
    };

    this.setId = function(id){
        if(id){
            logger.log('AnalyticsAdapter', 'set id', id);

            if(enabled){
                window.ga('set', '&uid', id);
            }
        }
    };

    this.setDimension = function(dimensionObj){
        var key, slot, value;
        if(dimensionObj){
            for(key in dimensionObj){
                if (Object.prototype.hasOwnProperty.call(dimensionObj, key)) {
                    slot = dimensions[key];
                    value = dimensionObj[key];

                    logger.log('AnalyticsAdapter', 'set dimension', slot, value);

                    if(enabled){
                        window.ga('set', 'dimension' + slot, value);
                    }
                }
            }
        }
    };

    this.trackPage = function(options){
        var properties = { 
            hitType: 'pageview'
        };
        var key, slot, value;

        if(options.page){
            properties.page = options.page;
        }
        if(options.title){
            properties.title = options.title;
        }
        if(options.dimensions){
            for(key in options.dimensions){
                if (Object.prototype.hasOwnProperty.call(options.dimensions, key)) {
                    slot = dimensions[key];
                    value = options.dimensions[key];
                    properties['dimension' + slot] = value;
                }
            }
        }

        logger.log('AnalyticsAdapter', 'track pageview', properties);

        if(enabled){
            window.ga('send', properties);
        }
    };

    this.trackEvent = function(options){
        var properties = { 
            hitType: 'event'
        };
        var key, slot, value;

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
            for(key in options.dimensions){
                if (Object.prototype.hasOwnProperty.call(options.dimensions, key)) {
                    slot = dimensions[key];
                    value = options.dimensions[key];
                    properties['dimension' + slot] = value;
                }
            }
        }

        logger.log('AnalyticsAdapter', 'track event', properties);

        if(enabled){
            window.ga('send', properties);
        }
    };
};