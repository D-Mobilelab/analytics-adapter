import init from '../init/init';
import setDimension from '../setDimension/setDimension';

let mockGA, mockLogger;

beforeEach(() => {
    mockGA = jest.fn();
    mockLogger = {
        log: jest.fn()
    };
});

test('setDimension() calls correctly ga and logger method', () => {
    const dimSlots = {
        UserLogged: 1,
        UserType: 3
    };
    const dimValue = {
        UserLogged: 'Logged',
        UserType: 'Premium'
    };

    init({
        enabled: true,
        dimensions: dimSlots,
        ga: mockGA,
        logger: mockLogger
    });
    setDimension(dimValue);

    expect(mockGA).toBeCalledWith('set', `dimension${dimSlots.UserLogged}`, dimValue.UserLogged);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'set dimension', dimSlots.UserLogged, dimValue.UserLogged);
    expect(mockGA).toBeCalledWith('set', `dimension${dimSlots.UserType}`, dimValue.UserType);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'set dimension', dimSlots.UserType, dimValue.UserType);
});

test('if initial and current dimensions are different, setDimension() does not calls ga and logger methods', () => {
    const dimSlots = {
        UserLogged: 1
    };
    const dimValue = {
        UserType: 'Premium'
    };
    
    init({
        enabled: true,
        dimensions: dimSlots,
        ga: mockGA,
        logger: mockLogger
    });
    setDimension(dimValue);

    expect(mockGA).not.toBeCalledWith('set', `dimension${dimSlots.UserLogged}`, undefined);
    expect(mockLogger.log).not.toBeCalledWith('AnalyticsAdapter', 'set dimension', dimSlots.UserLogged, undefined);
});

test('if the library is not enabled, setDimension() calls logger method but not ga method', () => {
    const dimSlots = {
        UserLogged: 1
    };
    const dimValue = {
        UserLogged: 'Logged'
    };
    
    init({
        enabled: false,
        dimensions: dimSlots,
        ga: mockGA,
        logger: mockLogger
    });
    setDimension(dimValue);

    expect(mockGA).not.toBeCalledWith('set', `dimension${dimSlots.UserLogged}`, dimValue.UserLogged);
    expect(mockLogger.log).toBeCalledWith('AnalyticsAdapter', 'set dimension', dimSlots.UserLogged, dimValue.UserLogged);
});