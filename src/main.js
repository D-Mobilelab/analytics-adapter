/**
* @ngdoc object
* @name AnalyticsAdapter
*
* @description
* Adapter for Google Analytics 
*/
var AnalyticsAdapter = new function(){

    var dimensions = {};
    var enabled = true;
    var logger =  { 
        debug: function(){},
        log: function(){},
        info: function(){},
        warn: function(){},
        error: function(){}
    };

    /**
     * @ngdoc function
     * @name init
     * @methodOf AnalyticsAdapter
     *
     * @description Initialize Analytics and set up the general configurations.
     *
     * @param {Object} options (see attributes below)
     * @param {boolean} [options.enabled=true] enable/disable tracking on Google Analytics
     * @param {Object} [options.logger=Object()] logging methods to use (see example below), if undefined there will be no logs
     * @param {Object} [options.dimensions=Object()] list of custom dimensions 
     * that will be used in the app, where
     
     * - *key*: custom dimension name
     * - *value*: slot id
     *
     * @example
     * # Logger 
     * Analytics with console as logger
     * <pre>
     *	AnalyticsAdapter.init({
     *  	enabled: true,
     *      logger: console,
     *      dimensions: {
     *          'UserStatus': 1,
     *          'AccessType': 2,
     *          'Valuable': 5,
     *          'Action': 8,
     *          'PaymentType': 11
     *      }
     *	});
     * </pre>
     *
     * Analytics with no logs
     * <pre>
     *	AnalyticsAdapter.init({
     *      enabled: true,
     *      dimensions: {
     *          'UserStatus': 1,
     *          'AccessType': 2,
     *          'Valuable': 5,
     *          'Action': 8,
     *          'PaymentType': 11
     *      }
     *	});
     * </pre>
     *
     * # Custom Dimensions
     * In analytics initialization phase, you have to define all custom dimensions 
     * that you will use in your applications.
     *
     * ***Init method doesn't set custom dimension on Google Analytics, it only saves 
     * custom dimension for future use (for example in event tracking).***
     *
     * You have to pass a pair (custom dimension name, slot id), where slot id is the slot 
     * of the custom dimension assigned from Google Analytics before.
     *
     * In this example, I set two custom dimensions ("UserStatus" with slot number 1 
     * and "Valuable" with slot number 5):
     * <pre>
     * AnalyticsAdapter.init({
     *     enabled: true,
     *     dimensions: {
     *         'UserStatus' : 1,
     *         'Valuable' : 5
     *     }
     * });
     * </pre>
     */
    this.init = function(options) {
        if(options) {
            if(options.dimensions){
                dimensions = options.dimensions;
            }
            if(typeof(options.enabled) !== 'undefined'){
                enabled = options.enabled;
            }

            // get logger
            if (options.logger){
                logger = options.logger;
            } else {
                logger = { 
                    debug: function(){},
                    log: function(){},
                    info: function(){},
                    warn: function(){},
                    error: function(){}
                };
            }
        }

        logger.log('Analytics', 'init', this);
    };

    /**
     * @ngdoc function
     * @name setId
     * @methodOf AnalyticsAdapter
     *
     * @description Set Analytics user id
     *
     * @param {string} id user id
     */
    this.setId = function(id){
        if(id){

            logger.log('AnalyticsAdapter', 'set id', id);

            if(enabled){
                ga('set', '&uid', id);
            }
        }
    };

    /**
     * @ngdoc function
     * @name setDimension
     * @methodOf AnalyticsAdapter
     *
     * @description 
     * Set a user/session (not hit) custom dimension.
     *
     * @param {Array[Object]} dimensions where:
     * - *key*: custom dimension name
     * - *value*: custom dimension value
     *
     * @example
     * **The custom dimension has to be defined in init method before** 
     * and, after, you have to use same custom dimension name.
     *
     * For example, in the following code, I set *UserStatus* on slot number 1 and 
     * I assigned it the *logged* value :
     * <pre>
     * // before, I save UserStatus custom dimension with slot "1"
     * Analytics.init({
     *     dimensions: {
     *         'UserStatus' : 1
     *     }
     * });
     *   
     * // after, I set custom dimension with the *logged* value:
     * AnalyticsAdapter.setDimension({
     *     'UserStatus' : 'logged'
     * });
     * </pre>
     */
    this.setDimension = function(dimensionObj){
        if(dimensionObj){
            var key, slot, value;
            for(key in dimensionObj){
                slot = dimensions[key];
                value = dimensionObj[key];

                logger.log('AnalyticsAdapter', 'set dimension', slot, value);

                if(enabled){
                    ga('set', 'dimension' + slot, value);
                }
            }
        }
    };

    /**
     * @ngdoc function
     * @name trackPage
     * @methodOf AnalyticsAdapter
     *
     * @description To track a pageview
     *
     * @param {object} options (see attributes below)
     * @param {string} options.page event page (e.g. '/category/7888')
     * @param {string} options.title event page title (e.g. 'Home Page')
     * @param {Array[Object]} options.dimensions where:
     * - *key*: custom dimension name
     * - *value*: custom dimension value
     */
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

        logger.log('AnalyticsAdapter', 'track pageview', properties);

        if(enabled){
            ga('send', properties);
        }
    };

    /**
     * @ngdoc function
     * @name trackEvent
     * @methodOf AnalyticsAdapter
     *
     * @description Track an event
     *
     * @param {Object} options (see attributes below)
     * @param {string} options.category event category
     * @param {string} options.action event action
     * @param {string} options.label event label
     * @param {integer} options.value event value
     * @param {Array[Object]} options.dimensions 
     * - *key*: custom dimension name
     * - *value*: custom dimension value
     *
     * @example
     * <pre>
     * AnalyticsAdapter.trackEvent({
     *     category: 'UI',
     *     action: 'open',
     *     label: 'menu',
     *     value: 7,
     *     dimensions: {
     *         'Valuable': 'yes'
     *     }
     * });
     * </pre>
     * **Note**: the custom dimension (in this example Valuable) has to defined in init method before and you have to use same custom dimension name.
     */
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

        logger.log('AnalyticsAdapter', 'track event', properties);

        if(enabled){
            ga('send', properties);
        }
    };

    return this;
};

module.exports = AnalyticsAdapter;