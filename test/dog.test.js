var dog = require('../src/dog');

describe('dog -', function () {

	var prefix, suffix;

	beforeEach(function(){
		prefix = 'hi, I am ';
		suffix = ', I am a dog!!';
	});

	it('simple test (one)', function(){
		var name = 'bobby';
		expect(dog.hello(name)).toEqual(prefix + name + suffix);
	});

})