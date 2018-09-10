import global from '../global';

export default (options) => {
    if (options) {
        if (options.ga) {
            global.ga = options.ga;
        }

        if (options.dimensions) {
            global.dimensions = options.dimensions;
        }
        if (typeof options.enabled !== 'undefined') {
            global.enabled = (
                options.enabled === true
                || options.enabled === 'true'
                || options.enabled === 1
                || options.enabled === '1'
            );
        }

        if (options.logger) {
            global.logger = options.logger;
        }
    }

    global.logger.log('AnalyticsAdapter', 'init', global);
};