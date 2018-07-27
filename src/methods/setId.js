import global from '../global';

export default (id) => {
    if (id) {
        global.logger.log('AnalyticsAdapter', 'set id', id);

        if (global.enabled) {
            window.ga('set', '&uid', id);
        }
    }
};