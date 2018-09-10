import global from '../global';

export default (options) => {
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
            slot = global.dimensions[key];
            value = options.dimensions[key];
            properties[`dimension${slot}`] = value;
        });
    }

    global.logger.log('AnalyticsAdapter', 'track pageview', properties);

    if (global.enabled) {
        global.ga('send', properties);
    }
};