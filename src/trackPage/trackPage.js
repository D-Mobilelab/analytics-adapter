/**
 * @memberof AnalyticsAdapter
 * @function trackPage
 * @description Track pageview events with optional custom dimensions
 * @param {Object} options - The trackPage options
 * @param {string} options.page - The page name
 * @param {string} options.title - The page title
 * @param {Object[]} options.dimensions
 * @param options.dimensions[].key - custom dimensions name
 * @param options.dimensions[].value - custom dimensions value
 *
 * @example
 * // Note: the custom dimension (in this example Valuable)
 * // has to be defined in the init method first and you have to use the same custom dimension name.
 * AnalyticsAdapter.trackPage({
 *     page: '/home',
 *     title: 'Home Page',
 *     dimensions: {
 *         dimensionOne: 'logged',
 *         dimensionFour: 'premium',
 *     }
 * });
 */
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