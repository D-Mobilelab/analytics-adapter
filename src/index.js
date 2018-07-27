export default {
    dimensions: {},
    enabled: true,
    logger: { 
        debug: function(){},
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    },

    init: function(options) {
        if(options) {
            if(options.dimensions){
                this.dimensions = options.dimensions;
            }
            if(typeof options.enabled !== 'undefined'){
                this.enabled = options.enabled;
            }

            // get logger
            if (options.logger){
                this.logger = options.logger;
            }
        }

        this.logger.log('Analytics', 'init', this);
    },

    setId: function(id){
        if(id){
            this.logger.log('AnalyticsAdapter', 'set id', id);

            if(this.enabled){
                window.ga('set', '&uid', id);
            }
        }
    },

    setDimension: function(dimensionObj){
        let key, slot, value;
        if(dimensionObj){
            for(key in dimensionObj){
                if (Object.prototype.hasOwnProperty.call(dimensionObj, key)) {
                    slot = this.dimensions[key];
                    value = dimensionObj[key];

                    this.logger.log('AnalyticsAdapter', 'set dimension', slot, value);

                    if(this.enabled){
                        window.ga('set', 'dimension' + slot, value);
                    }
                }
            }
        }
    },

    trackPage: function(options){
        let properties = { 
            hitType: 'pageview'
        };
        let key, slot, value;

        if(options.page){
            properties.page = options.page;
        }
        if(options.title){
            properties.title = options.title;
        }
        if(options.dimensions){
            for(key in options.dimensions){
                if (Object.prototype.hasOwnProperty.call(options.dimensions, key)) {
                    slot = this.dimensions[key];
                    value = options.dimensions[key];
                    properties['dimension' + slot] = value;
                }
            }
        }

        this.logger.log('AnalyticsAdapter', 'track pageview', properties);

        if(this.enabled){
            window.ga('send', properties);
        }
    },

    trackEvent: function(options){
        let properties = { 
            hitType: 'event'
        };
        let key, slot, value;

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
                    slot = this.dimensions[key];
                    value = options.dimensions[key];
                    properties['dimension' + slot] = value;
                }
            }
        }

        this.logger.log('AnalyticsAdapter', 'track event', properties);

        if(this.enabled){
            window.ga('send', properties);
        }
    }
};