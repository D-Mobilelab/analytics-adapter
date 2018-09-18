/**
 * @class AnalyticsAdapter
 * @description Adapter for Google Analytics
 */
import init from './init/init';
import setId from './setId/setId';
import setDimension from './setDimension/setDimension';
import trackPage from './trackPage/trackPage';
import trackEvent from './trackEvent/trackEvent';

export default {
    /**
     * @see modules/init
     */
    init,
    /**
     * @see modules/setId
     */
    setId,
    /**
     * @see modules/setDimension
     */
    setDimension,
    /**
     * @see modules/trackPage
     */
    trackPage,
    /**
     * @see modules/trackEvent
     */
    trackEvent,
};
