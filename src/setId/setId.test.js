import init from '../init/init';
import setId from '../setId/setId';

let mockGA, mockLogger;

beforeEach(() => {
    mockGA = jest.fn();
    mockLogger = {
        log: jest.fn()
    };
});

test('setId() calls correctly ga and logger methods', () => {
    const id = '1234abcef';
    
    init({
        enabled: true,
        ga: mockGA,
        logger: mockLogger
    });
    setId(id);

    expect(mockGA).toBeCalledWith('set', '&uid', id);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'set id', id);
});

test('if id is undefined, setId() does not call ga and logger methods', () => {
    const id = undefined;

    init({
        enabled: true,
        ga: mockGA,
        logger: mockLogger
    });
    setId(id);
    
    expect(mockGA).not.toBeCalledWith('set', '&uid', id);
    expect(mockLogger.log).not.toBeCalledWith('AnalyticsAdapter', 'set id', id);
});

test('if the library is not enabled, setId() calls logger method but not ga method', () => {
    const id = 'abcdef1234';

    init({
        enabled: false,
        ga: mockGA,
        logger: mockLogger
    });
    setId(id);

    expect(mockGA).not.toBeCalledWith('set', '&uid', id);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'set id', id);
});