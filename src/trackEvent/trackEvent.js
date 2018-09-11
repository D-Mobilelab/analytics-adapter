/**
 * @memberof AnalyticsAdapter
 * @function trackEvent
 * @description Track an event
 * @param {Object} options (see attributes below)
 * @param {string} options.category event category
 * @param {string} options.action event action
 * @param {string} options.label event label
 * @param {number} options.value event value
 * @param {Object[]} options.dimensions
 * @param options.dimensions[].key - custom dimensions name
 * @param options.dimensions[].value - custom dimensions value
 *
 * @example
 * // Note: the custom dimension (in this example Valuable)
 * // has to be defined in the init method first and you have to use the same custom dimension name.
 * AnalyticsAdapter.trackPage({
 *     category: 'UI',
 *     action: 'open',
 *     label: 'menu',
 *     value: 7,
 *     dimensions: {
 *         'Valuable': 'yes'
 *     }
 * });
 */
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