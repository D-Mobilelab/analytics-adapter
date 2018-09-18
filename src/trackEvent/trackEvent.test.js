import init from '../init/init';
import trackEvent from './trackEvent';

let mockGA, mockLogger;

beforeEach(() => {
    mockGA = jest.fn();
    mockLogger = {
        log: jest.fn()
    };
});

const commonOptions = {
    label: 'testLabel',
    value: 'testValue',
    action: 'click',
    category: 'testing'
};

const commonExpectedProps = {
    hitType: 'event',
    eventLabel: commonOptions.label,
    eventValue: commonOptions.value,
    eventAction: commonOptions.action,
    eventCategory: commonOptions.category,
};

test('trackEvent() calls correctly ga and logger methods', () => {
    const options = commonOptions;
    const expectedProps = commonExpectedProps;

    init({
        enabled: true,
        ga: mockGA,
        logger: mockLogger,
    });
    trackEvent(options);

    expect(mockGA).toBeCalledWith('send', expectedProps);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'track event', expectedProps);
});

test('trackEvent() should send the event with the correct dimensions', () => {
    const options = Object.assign({
        dimensions: {
            dimensionOne: 'logged',
            dimensionFour: 'premium'
        }
    }, commonOptions);

    const expectedProps = Object.assign({
        dimension1: 'logged',
        dimension4: 'premium',
    }, commonExpectedProps);

    init({
        enabled: true,
        ga: mockGA,
        logger: mockLogger,
        dimensions: {
            dimensionOne: 1,
            dimensionFour: 4
        }
    });
    trackEvent(options);

    expect(mockGA).toBeCalledWith('send', expectedProps)
});

test('if the library is not enabled, trackEvent() calls logger method but not ga method', () => {
    const options = commonOptions;
    const expectedProps = commonExpectedProps;

    init({
        enabled: false,
        ga: mockGA,
        logger: mockLogger
    });
    trackEvent(options);

    expect(mockGA).not.toBeCalledWith('send', expectedProps);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'track event', expectedProps);
});