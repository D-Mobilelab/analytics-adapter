var cat = require('../src/cat');

describe('cat -', function () {

	var prefix, suffix;

	beforeEach(function(){
		prefix = 'hi, I am ';
		suffix = ', I am a cat!!';
	});

	it('simple test (one)', function(){
		var name = 'bobby';
		expect(cat.hello(name)).toEqual(prefix + name + suffix);
	});

})