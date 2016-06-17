var cat = require('../src/cat');
var dog = require('../src/dog');
var main = require('../src/main');

describe('main -', function () {

	it('cat is cat', function(){
		expect(main.cat).toEqual(cat);
	});

	it('dog is dog', function(){
		expect(main.dog).toEqual(dog);
	});

})