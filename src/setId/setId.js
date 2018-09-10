import global from '../global';

export default (id) => {
    if (id) {
        global.logger.log('AnalyticsAdapter', 'set id', id);

        if (global.enabled) {
            global.ga('set', '&uid', id);
        }
    }
};