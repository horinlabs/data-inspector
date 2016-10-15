var expect = require('chai').expect;

var Inspector = require('./main');

describe('Inspector', function(){
	it('should return an array with error objects', function(){
		var data = {
			name: 'Squirtle',
			description: 'A small Pokémon.',
			type: 'water'
		};

		var rules = {
			name: { type: 'string', minLength: 5 },
			description: { type: 'string', minLength: 20 },
			type: { type: 'string', pattern: '^(fire|water|grass)$' },
		};

		var messages = {
			description: {
				type: 'The Pokémon description must be a text.',
				minLength: 'The Pokémon description must have at least length of 20.'
			}
		};

		expect(Inspector.verify(data, rules, messages)).to.deep.equal([
			{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
		]);
	});
});
