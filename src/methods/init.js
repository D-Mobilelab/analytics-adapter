import global from '../global';

export default (options) => {
    if (options) {
        if (options.dimensions) {
            global.dimensions = options.dimensions;
        }
        if (typeof options.enabled !== 'undefined') {
            global.enabled = options.enabled;
        }

        // get logger
        if (options.logger) {
            global.logger = options.logger;
        }
    }

    global.logger.log('Analytics', 'init', global);
};