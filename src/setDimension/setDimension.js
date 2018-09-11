/**
 * @memberof AnalyticsAdapter
 * @function setDimension
 * @description Set a user/session (not hit) custom dimension.
 * @param {Object[]} dimensions
 * @param dimensions[].key - custom dimensions name
 * @param dimensions[].value - custom dimensions value
 *
 * @example
 * // The custom dimension has to be defined in init method before
 * // and, after, you have to use the same custom dimension name.
 *
 * // For example, in the following code, I set UserStatus on slot number 1 and
 * // assign it the logged value:
 *
 * // before, I save UserStatus custom dimension with slot "1"
 * Analytics.init({
 *     dimensions: {
 *         'UserStatus' : 1
 *     }
 * });
 *
 * // after, I set custom dimension with the logged value:
 * AnalyticsAdapter.setDimension({
 *     'UserStatus' : 'logged'
 * });
 */
import global from '../global';

export default (dimensionObj) => {
    let slot, value;
    if (dimensionObj) {
        Object.keys(dimensionObj).forEach((key) => {
            slot = global.dimensions[key];
            value = dimensionObj[key];

            global.logger.log('AnalyticsAdapter', 'set dimension', slot, value);

            if (global.enabled) {
                global.ga('set', `dimension${slot}`, value);
            }
        });
    }
};