import global from '../global';

export default (options) => {
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
            slot = global.dimensions[key];
            value = options.dimensions[key];
            properties[`dimension${slot}`] = value;
        });
    }

    global.logger.log('AnalyticsAdapter', 'track event', properties);

    if (global.enabled) {
        global.ga('send', properties);
    }
};