export default {
    dimensions: {},
    enabled: true,
    logger: {
        debug: () => {},
        log: () => {},
        info: () => {},
        warn: () => {},
        error: () => {}
    },

    init: (options) => {
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

    setId: (id) => {
        if (id) {
            this.logger.log('AnalyticsAdapter', 'set id', id);

            if (this.enabled) {
                window.ga('set', '&uid', id);
            }
        }
    },

    setDimension: (dimensionObj) => {
        let slot, value;
        if (dimensionObj) {
            Object.keys(dimensionObj).forEach((key) => {
                slot = this.dimensions[key];
                value = dimensionObj[key];

                this.logger.log('AnalyticsAdapter', 'set dimension', slot, value);

                if (this.enabled) {
                    window.ga('set', `dimension${slot}`, value);
                }
            });
        }
    },

    trackPage: (options) => {
        const properties = {
            hitType: 'pageview'
        };
        let slot, value;

        if (options.page) {
            properties.page = options.page;
        }
        if (options.title) {
            properties.title = options.title;
        }
        if (options.dimensions) {
            Object.keys(options.dimensions).forEach((key) => {
                slot = this.dimensions[key];
                value = options.dimensions[key];
                properties[`dimension${slot}`] = value;
            });
        }

        this.logger.log('AnalyticsAdapter', 'track pageview', properties);

        if (this.enabled) {
            window.ga('send', properties);
        }
    },

    trackEvent: (options) => {
        const properties = {
            hitType: 'event'
        };
        let slot, value;

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
            Object.keys(options.dimensions).forEach((key) => {
                slot = this.dimensions[key];
                value = options.dimensions[key];
                properties[`dimension${slot}`] = value;
            });
        }

        this.logger.log('AnalyticsAdapter', 'track event', properties);

        if (this.enabled) {
            window.ga('send', properties);
        }
    }
};
