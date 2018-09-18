/**
 * @memberof AnalyticsAdapter
 * @function init
 * @description Initialize Analytics and set up the general configurations.
 * @param {Object} options (see attributes below)
 * @param {boolean} [options.enabled=true] enable/disable tracking on Google Analytics
 * @param {Object} [options.logger=Object()] logging methods to use (see example below),
 * if undefined there will be no logs
 * @param {Object[]} [options.dimensions=Object()]
 * @param options.dimensions[].key - custom dimensions name
 * @param options.dimensions[].value - custom dimensions value
 *
 * @example
 * // Logger
 * // Analytics with console as logger
 *  AnalyticsAdapter.init({
 *      enabled: true,
 *      logger: console,
 *      dimensions: {
 *          'UserStatus': 1,
 *          'AccessType': 2,
 *          'Valuable': 5,
 *          'Action': 8,
 *          'PaymentType': 11
 *      }
 *  });
 *
 * @example
 * // Analytics with no logs
 *  AnalyticsAdapter.init({
 *      enabled: true,
 *      dimensions: {
 *          'UserStatus': 1,
 *          'AccessType': 2,
 *          'Valuable': 5,
 *          'Action': 8,
 *          'PaymentType': 11
 *      }
 *  });
 *
 * @example
 * // Custom Dimensions
 * // In analytics initialization phase, you have to define all custom dimensions
 * // that you will use in your applications.
 *
 * // Init method doesn't set custom dimension on Google Analytics, it only saves
 * // custom dimension for future use (for example in event tracking).
 *
 * // You have to pass a pair (custom dimension name, slot id), where slot id is the slot
 * // of the custom dimension assigned from Google Analytics before.
 *
 * // In this example, I set two custom dimensions ("UserStatus" with slot number 1
 * // and "Valuable" with slot number 5):
 * AnalyticsAdapter.init({
 *     enabled: true,
 *     dimensions: {
 *         'UserStatus' : 1,
 *         'Valuable' : 5
 *     }
 * });
 */
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