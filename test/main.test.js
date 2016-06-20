var AnalyticsAdapter = require('../src/main');
var dimensions, logger;

beforeEach(function(){

	dimensions = {
		dimensionOne: 1,
		dimensionFour: 4
	};

	logger = {
		log: function(){},
		info: function(){},
		warn: function(){},
		error: function(){}
	};

	window.ga = function(){};

	spyOn(logger, 'log');
	spyOn(window, 'ga');

	AnalyticsAdapter.init({
		dimensions: dimensions,
		enabled: true,
		logger: logger
	});
});

describe('setId -', function(){
	it('method set GA user id', function(){
		var id = 123456789;
		AnalyticsAdapter.setId(id);
		expect(window.ga).toHaveBeenCalledWith('set', '&uid', id);
	});

	it('method does not set GA user id, if id is missing', function(){
		var id = undefined;
		AnalyticsAdapter.setId(id);
		expect(window.ga.calls.count()).toEqual(0);
	});

	it('method set GA user id, logger', function(){
		var id = 123456789;
		AnalyticsAdapter.setId(id);
		expect(logger.log).toHaveBeenCalledWith('AnalyticsAdapter', 'set id', id);
	});
});

describe('setDimension -', function(){
	it('method set a single GA dimension', function(){
		var newDimensions = { dimensionOne: 'logged' };
		AnalyticsAdapter.setDimension(newDimensions);
		expect(window.ga).toHaveBeenCalledWith('set', 'dimension' + 1, 'logged');
	});

	it('method set multiple GA dimensions', function(){
		var newDimensions = { dimensionOne: 'logged', dimensionFour: 'premium' };
		AnalyticsAdapter.setDimension(newDimensions);
		expect(window.ga).toHaveBeenCalledWith('set', 'dimension' + 1, 'logged');
		expect(window.ga).toHaveBeenCalledWith('set', 'dimension' + 4, 'premium');
	});

	it('method set a single GA dimension, logger', function(){
		var newDimensions = { dimensionOne: 'logged' };
		AnalyticsAdapter.setDimension(newDimensions);
		expect(logger.log).toHaveBeenCalledWith('AnalyticsAdapter', 'set dimension', 1, 'logged');
	});

	it('method set multiple GA dimensions, logger', function(){
		var newDimensions = { dimensionOne: 'logged', dimensionFour: 'premium' };
		AnalyticsAdapter.setDimension(newDimensions);
		expect(logger.log).toHaveBeenCalledWith('AnalyticsAdapter', 'set dimension', 1, 'logged');
		expect(logger.log).toHaveBeenCalledWith('AnalyticsAdapter', 'set dimension', 4, 'premium');
	});

	it('method does not set a GA dimensions, if dimension is empty', function(){
		var newDimensions = {};
		AnalyticsAdapter.setDimension(newDimensions);
		expect(window.ga.calls.count()).toEqual(0);
	});
});

describe('trackPage -', function(){
	it('method track a GA pageview', function(){
		AnalyticsAdapter.trackPage({
			page: '/category',
			title: 'Category Page',
			dimensions: {
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			}
		});

		expect(window.ga).toHaveBeenCalledWith('send', {
			hitType: 'pageview',
			page: '/category',
			title: 'Category Page',
			dimension1: 'logged',
			dimension4: 'premium'
		});
	});

	it('method track a GA pageview, logger', function(){
		AnalyticsAdapter.trackPage({
			page: '/category',
			title: 'Category Page',
			dimensions: {
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			}
		});

		expect(logger.log).toHaveBeenCalledWith('AnalyticsAdapter', 'track pageview', {
			hitType: 'pageview',
			page: '/category',
			title: 'Category Page',
			dimension1: 'logged',
			dimension4: 'premium'
		});
	})
});

describe('trackEvent -', function(){

	it('method track a GA event', function(){
		AnalyticsAdapter.trackEvent({
			category: 'Sport',
			action: 'Shot',
			label: 'GOAL',
			value: 5,
			dimensions: {
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			}
		});

		expect(window.ga).toHaveBeenCalledWith('send', {
			hitType: 'event',
			eventCategory: 'Sport',
			eventAction: 'Shot',
			eventLabel: 'GOAL',
			eventValue: 5,
			dimension1: 'logged',
			dimension4: 'premium'
		});
	});

	it('method track a GA event, logger', function(){
		AnalyticsAdapter.trackEvent({
			category: 'Sport',
			action: 'Shot',
			label: 'GOAL',
			value: 5,
			dimensions: {
				dimensionOne: 'logged',
				dimensionFour: 'premium'
			}
		});

		expect(logger.log).toHaveBeenCalledWith('AnalyticsAdapter', 'track event', {
			hitType: 'event',
			eventCategory: 'Sport',
			eventAction: 'Shot',
			eventLabel: 'GOAL',
			eventValue: 5,
			dimension1: 'logged',
			dimension4: 'premium'
		});
	})
});

