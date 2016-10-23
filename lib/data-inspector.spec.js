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

	describe('required', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				description: { required: true }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The attribute `description` is required'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				description: { required: true }
			};

			var messages = {
				description: {
					required: 'Description is required, bro'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'Description is required, bro'}
			]);
		});
	});

	describe('type', function(){
		it('returns the default message', function(){
			var data = {
				name: 10
			};

			var rules = {
				name: { type: 'string' }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'name', message: 'The attribute `name` must be of type string'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 10
			};

			var rules = {
				name: { type: 'string' }
			};

			var messages = {
				name: {
					type: 'The Pokémon name must be a text.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'name', message: 'The Pokémon name must be a text.'}
			]);
		});
	});

	describe('pattern', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle',
				color: 'FFF'
			};

			var rules = {
				color: { pattern: /(?:#|0x)?(?:[0-9A-F]{2}){3,4}/ }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'color', message: 'The attribute `color` is invalid'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle',
				color: 'FFF'
			};

			var rules = {
				color: { pattern: /(?:#|0x)?(?:[0-9A-F]{2}){3,4}/ }
			};

			var messages = {
				color: {
					pattern: 'The Pokémon `color` must be a valid hexadecimal color.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'color', message: 'The Pokémon `color` must be a valid hexadecimal color.'}
			]);
		});
	});

	describe('exactLength', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { exactLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'name', message: 'The attribute `name` must have the exact length of 5'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { exactLength: 5 }
			};

			var messages = {
				name: {
					exactLength: 'The Pokémon name must have 5 characters.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'name', message: 'The Pokémon name must have 5 characters.'}
			]);
		});
	});

	describe('minLength', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle',
				description: 'The best Pokemon of all!'
			};

			var rules = {
				description: { type: 'string', minLength: 40 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The attribute `description` must have a minimum length of 40'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle',
				description: 'The best Pokemon of all!'
			};

			var rules = {
				description: { type: 'string', minLength: 40 }
			};

			var messages = {
				description: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 40.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 40.'}
			]);
		});
	});

	describe('custom', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Pikachu',
				type: 'eletric',
				description: 'Useless Pokemon.'
			};

			var rules = {
				type: { theBest: (schema, field, value) => value === 'water' && value !== 'eletric' }
			};

			var messages = {
				type: {
					theBest: 'The Pokémon must be of type water, not eletric.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'type', message: 'The Pokémon must be of type water, not eletric.'}
			]);
		});
	});

	describe('maxLength', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle',
				description: 'Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla'
			};

			var rules = {
				description: { type: 'string', maxLength: 50 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The attribute `description` must have a maximum length of 50'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle',
				description: 'Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla'
			};

			var rules = {
				description: { type: 'string', maxLength: 50 }
			};

			var messages = {
				description: {
					type: 'The Pokémon description must be a text.',
					maxLength: 'The Pokémon description must have a maximum length of 50.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have a maximum length of 50.'}
			]);
		});
	});

	describe.skip('lengthBetween', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('lessThan', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('lessOrEqualThan', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('greaterThan', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('greaterOrEqualThan', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('equal', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('notEqual', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('accepted', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('afterDate', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('beforeDate', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('equalDate', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('equalOrBeforeDate', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('equalOrAfterDate', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('betweenDates', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('alpha', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('alphaDash', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('alphaNumeric', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('email', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('url', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('ip', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('between', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('betweenStrict', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('different', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('digits', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('distinct', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('in', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('notIn', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('requiredWith', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});

	describe.skip('requiredWithout', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', minLength: 5 }
			};

			var messages = {
				name: {
					type: 'The Pokémon description must be a text.',
					minLength: 'The Pokémon description must have at least length of 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'description', message: 'The Pokémon description must have at least length of 20.'}
			]);
		});
	});
});
