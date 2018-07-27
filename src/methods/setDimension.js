import global from '../global';

export default (dimensionObj) => {
    let slot, value;
    if (dimensionObj) {
        Object.keys(dimensionObj).forEach((key) => {
            slot = global.dimensions[key];
            value = dimensionObj[key];

            global.logger.log('AnalyticsAdapter', 'set dimension', slot, value);

            if (global.enabled) {
                window.ga('set', `dimension${slot}`, value);
            }
        });
    }
};