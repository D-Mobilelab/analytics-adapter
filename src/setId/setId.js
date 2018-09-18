/**
 * @memberof AnalyticsAdapter
 * @function setId
 * @description Set Analytics user id
 * @param {string} id - user id
 *
 * @example
 * AnalyticsAdapter.setId("123rgr");
 */
import global from '../global';

export default (id) => {
    if (id) {
        global.logger.log('AnalyticsAdapter', 'set id', id);

        if (global.enabled) {
            global.ga('set', '&uid', id);
        }
    }
};