import init from '../init/init';
import trackPage from './trackPage';

let mockGA, mockLogger;

beforeEach(() => {
    mockGA = jest.fn();
    mockLogger = {
        log: jest.fn()
    };
});

const commonOptions = {
    page: 'Test Page',
    title: 'Page test',
};

const commonExpectedProps = Object.assign({
    hitType: 'pageview',
}, commonOptions);

test('trackPage() calls correctly ga and logger methods', () => {
    const options = commonOptions;
    const expectedProps = commonExpectedProps;

    init({
        enabled: true,
        ga: mockGA,
        logger: mockLogger,
    });
    trackPage(options);

    expect(mockGA).toBeCalledWith('send', expectedProps);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'track pageview', expectedProps);
});

test('trackPage() should send the event with the correct dimensions', () => {
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
    trackPage(options);

    expect(mockGA).toBeCalledWith('send', expectedProps)
});

test('if the library is not enabled, trackPage() calls logger method but not ga method', () => {
    const options = commonOptions;
    const expectedProps = commonExpectedProps;

    init({
        enabled: false,
        ga: mockGA,
        logger: mockLogger
    });
    trackPage(options);

    expect(mockGA).not.toBeCalledWith('send', expectedProps);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'track pageview', expectedProps);
});