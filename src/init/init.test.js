import init from './init';
import global from '../global';

let mockGA, mockLogger;

beforeEach(() => {
    mockGA = jest.fn();
    mockLogger = {
        log: jest.fn()
    };
    // Need to reset the enabled to the default value
    global.enabled = true;
});

test('init() should set global parameters from the given options', () => {
    const dimensions = {
        dimensionOne: 1,
        dimensionFour: 4
    };

    init({
        ga: mockGA,
        logger: mockLogger,
        dimensions
    });

    expect(global.ga).toBe(mockGA);
    expect(global.logger).toBe(mockLogger);
    expect(global.dimensions).toBe(dimensions);
});

test('init() should be enabled if enabled param is "true" as string', () => {
    init({
        enabled: 'true'
    });
    expect(global.enabled).toBeTruthy();
});

test('init() should be enabled if enabled param is 1', () => {
    init({
        enabled: 1
    });
    expect(global.enabled).toBeTruthy();
});

test('init() should be enabled if enabled param is "1" as string', () => {
    init({
        enabled: '1'
    });
    expect(global.enabled).toBeTruthy();
});

test('init() should be disabled if enabled param is "false" as string', () => {
    init({
        enabled: 'false'
    });
    expect(global.enabled).toBeFalsy();
});

test('init() should be enabled if enabled param is not passed', () => {
    init();
    expect(global.enabled).toBeTruthy();
});

test('init() should be disabled if enabled param is passed as null', () => {
    init({
        enabled: null
    });
    expect(global.enabled).toBeFalsy();
});

test('init() should be disabled if enabled param is passed as false', () => {
    init({
        enabled: false
    });
    expect(global.enabled).toBeFalsy();
});