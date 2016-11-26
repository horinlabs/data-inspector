var expect = require('chai').expect;

var Inspector = require('./main');

describe('Inspector', function(){
	it('should return an array with error objects', function(){
		var data = {
			name: 'Squirtle',
			description: 'A small Pokémon.',
			type: 'water',
			another: {
				nested: {
					field: 'should be a number'
				}
			}
		};

		var rules = {
			name: { type: 'string', alpha: true, minLength: 5 },
			description: { type: 'string', minLength: 20 },
			type: { type: 'string', pattern: /^(fire|water|grass)$/ },
			'another.nested.field': { type: 'number' }
		};

		var messages = {
			description: {
				type: 'The Pokémon description must be a text.',
				minLength: 'The Pokémon description must have at least length of 20.'
			}
		};

		expect(Inspector.verify(data, rules, messages)).to.deep.equal([
			{field: 'description', message: 'The Pokémon description must have at least length of 20.'},
			{field: 'another.nested.field', message: 'The attribute `another.nested.field` must be of type number'}
		]);
	});

	it('should return an object with errors when in minimal mode', function(){
		var data = {
			id: 'Something',
			name: 'Squirtle',
			type: 'water',
			another: {
				nested: {
					field: 'should be a number'
				}
			}
		};

		var rules = {
			name: { type: 'string', alpha: true, minLength: 5 },
			id: { type: 'number', lessThan: 151 },
			type: { type: 'string', pattern: /^(fire|water|grass)$/ },
			'another.nested.field': { type: 'number' }
		};

		var messages = {
			id: {
				type: 'The Pokémon id must be a number.',
				equal: 'The Pokémon id must be less than 151.'
			}
		};

		expect(Inspector.verify(data, rules, messages, { minimal: true })).to.deep.equal({
			'id': 'The Pokémon id must be a number.',
			'another.nested.field': 'The attribute `another.nested.field` must be of type number'
		});
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

	describe('lengthBetween', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Abc'
			};

			var rules = {
				name: { type: 'string', lengthBetween: [8, 20] }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'name', message: 'The attribute `name` must have a length between 8 and 20'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Squirtle'
			};

			var rules = {
				name: { type: 'string', lengthBetween: [20] }
			};

			var messages = {
				name: {
					lengthBetween: 'The name must have a length between 8 and 20.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'name', message: 'The name must have a length between 8 and 20.'}
			]);
		});
	});

	describe('lessThan', function(){
		it('returns the default message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { lessThan: 5 },
				another: { lessThan: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must have a value less than 5'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 8,
				another: 3
			};

			var rules = {
				number: { lessThan: 5 },
				another: { lessThan: 5 }
			};

			var messages = {
				number: {
					lessThan: 'The number must have a minimum of 5.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The number must have a minimum of 5.'}
			]);
		});
	});

	describe('lessOrEqualThan', function(){
		it('returns the default message', function(){
			var data = {
				number: 8,
				another: 8
			};

			var rules = {
				number: { lessOrEqualThan: 5 },
				another: { lessOrEqualThan: 8 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must have a value less than or equal 5'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 8,
				another: 8
			};

			var rules = {
				number: { lessOrEqualThan: 5 },
				another: { lessOrEqualThan: 8 }
			};

			var messages = {
				number: {
					lessOrEqualThan: 'The number must have a minimum of 5.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The number must have a minimum of 5.'}
			]);
		});
	});

	describe('greaterThan', function(){
		it('returns the default message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { greaterThan: 9 },
				another: { greaterThan: 3 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must have a value greater than 9'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { greaterThan: 9 },
				another: { greaterThan: 3 }
			};

			var messages = {
				number: {
					greaterThan: 'The number must be greater than 5.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The number must be greater than 5.'}
			]);
		});
	});

	describe('greaterOrEqualThan', function(){
		it('returns the default message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { greaterOrEqualThan: 9 },
				another: { greaterOrEqualThan: 4 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must have a value greater than or equal 9'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { greaterOrEqualThan: 9 },
				another: { greaterOrEqualThan: 4 }
			};

			var messages = {
				number: {
					greaterOrEqualThan: 'The number must be greater than or equal 9.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The number must be greater than or equal 9.'}
			]);
		});
	});

	describe('equal', function(){
		it('returns the default message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { equal: 9 },
				another: { equal: 4 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must have a value equal 9'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { equal: 9 },
				another: { equal: 4 }
			};

			var messages = {
				number: {
					equal: 'The number must be equal 9.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The number must be equal 9.'}
			]);
		});
	});

	describe('notEqual', function(){
		it('returns the default message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { notEqual: 9 },
				another: { notEqual: 4 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'another', message: 'The attribute `another` must have a value different than 4'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 8,
				another: 4
			};

			var rules = {
				number: { notEqual: 9 },
				another: { notEqual: 4 }
			};

			var messages = {
				another: {
					notEqual: 'The number must not be equal 4.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'another', message: 'The number must not be equal 4.'}
			]);
		});
	});

	describe('accepted', function(){
		it('returns the default message', function(){
			var data = {
				agreed: 'no'
			};

			var rules = {
				agreed: { accepted: true }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'agreed', message: 'The attribute `agreed` must be accepted'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				agreed: 'no'
			};

			var rules = {
				agreed: { accepted: true }
			};

			var messages = {
				agreed: {
					accepted: 'The terms of service must be accepted.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'agreed', message: 'The terms of service must be accepted.'}
			]);
		});
	});

	describe('afterDate', function(){
		it('returns the default message', function(){
			var data = {
				aDate: '2005-05-16'
			};

			var rules = {
				aDate: { afterDate: '2005-05-16' }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'aDate', message: 'The attribute `aDate` must be a date after 2005-05-16'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				aDate: '2005-05-16'
			};

			var rules = {
				aDate: { afterDate: '2005-05-18' }
			};

			var messages = {
				aDate: {
					afterDate: 'The date is wrong.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'aDate', message: 'The date is wrong.'}
			]);
		});
	});

	describe('beforeDate', function(){
		it('returns the default message', function(){
			var data = {
				aDate: '2005-05-16'
			};

			var rules = {
				aDate: { beforeDate: '2005-05-16' }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'aDate', message: 'The attribute `aDate` must be a date before 2005-05-16'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				aDate: '2005-05-16'
			};

			var rules = {
				aDate: { beforeDate: '2005-05-15' }
			};

			var messages = {
				aDate: {
					beforeDate: 'The date is wrong.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'aDate', message: 'The date is wrong.'}
			]);
		});
	});

	describe('equalDate', function(){
		it('returns the default message', function(){
			var data = {
				aDate: '2005-05-14'
			};

			var rules = {
				aDate: { equalDate: '2005-05-16' }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'aDate', message: 'The attribute `aDate` must be a date equal 2005-05-16'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				aDate: '2005-05-16'
			};

			var rules = {
				aDate: { equalDate: '2005-05-15' }
			};

			var messages = {
				aDate: {
					equalDate: 'The date is wrong.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'aDate', message: 'The date is wrong.'}
			]);
		});
	});

	describe('equalOrBeforeDate', function(){
		it('returns the default message', function(){
			var data = {
				aDate: '2005-06-16'
			};

			var rules = {
				aDate: { equalOrBeforeDate: '2005-05-16' }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'aDate', message: 'The attribute `aDate` must be a date before or equal 2005-05-16'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				aDate: '2005-05-16'
			};

			var rules = {
				aDate: { equalOrBeforeDate: '2005-05-15' }
			};

			var messages = {
				aDate: {
					equalOrBeforeDate: 'The date is wrong.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'aDate', message: 'The date is wrong.'}
			]);
		});
	});

	describe('equalOrAfterDate', function(){
		it('returns the default message', function(){
			var data = {
				aDate: '2005-04-16'
			};

			var rules = {
				aDate: { equalOrAfterDate: '2005-05-16' }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'aDate', message: 'The attribute `aDate` must be a date after or equal 2005-05-16'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				aDate: '2005-03-16'
			};

			var rules = {
				aDate: { equalOrAfterDate: '2005-05-15' }
			};

			var messages = {
				aDate: {
					equalOrAfterDate: 'The date is wrong.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'aDate', message: 'The date is wrong.'}
			]);
		});
	});

	describe('betweenDates', function(){
		it('returns the default message', function(){
			var data = {
				aDate: '2005-04-16'
			};

			var rules = {
				aDate: { betweenDates: ['2005-05-16', '2005-09-16'] }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'aDate', message: 'The attribute `aDate` must be a date between 2005-05-16 and 2005-09-16'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				aDate: '2005-03-16'
			};

			var rules = {
				aDate: { betweenDates: ['2005-05-16', '2005-09-16'] }
			};

			var messages = {
				aDate: {
					betweenDates: 'The date is wrong.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'aDate', message: 'The date is wrong.'}
			]);
		});
	});

	describe('alpha', function(){
		it('returns the default message', function(){
			var data = {
				name: '555a'
			};

			var rules = {
				name: { alpha: true }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'name', message: 'The attribute `name` must be entirely alphabetic characters'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: '555a'
			};

			var rules = {
				name: { alpha: true }
			};

			var messages = {
				name: {
					alpha: 'The name must contains letters only.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'name', message: 'The name must contains letters only.'}
			]);
		});
	});

	describe('alphaDash', function(){
		it('returns the default message', function(){
			var data = {
				name: '55.5a',
				another: 'a_nother'
			};

			var rules = {
				name: { alphaDash: true },
				another: { alphaDash: true }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'name', message: 'The attribute `name` may have alpha-numeric characters, as well as dashes and underscores'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: '55.5a',
				another: 'a_nother'
			};

			var rules = {
				name: { alphaDash: true },
				another: { alphaDash: true }
			};

			var messages = {
				name: {
					alphaDash: 'The name must contains letters and underscores only.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'name', message: 'The name must contains letters and underscores only.'}
			]);
		});
	});

	describe('alphaNumeric', function(){
		it('returns the default message', function(){
			var data = {
				name: '55.5a',
				another: '55a'
			};

			var rules = {
				name: { alphaNumeric: true },
				another: { alphaNumeric: true }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'name', message: 'The attribute `name` must be entirely alpha-numeric characters'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: '55.5a',
				another: '555a'
			};

			var rules = {
				name: { alphaNumeric: true },
				another: { alphaNumeric: true }
			};

			var messages = {
				name: {
					alphaNumeric: 'The name must contains letters and numbers only.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'name', message: 'The name must contains letters and numbers only.'}
			]);
		});
	});

	describe('email', function(){
		it('returns the default message', function(){
			var data = {
				email: '55.5a',
				another: '55a@abc.com'
			};

			var rules = {
				email: { email: true },
				another: { email: true }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'email', message: 'The attribute `email` must be formatted as an email address'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				email: '55.5a',
				another: '55a@abc.com'
			};

			var rules = {
				email: { email: true },
				another: { email: true }
			};

			var messages = {
				email: {
					email: 'The e-mail is not valid.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'email', message: 'The e-mail is not valid.'}
			]);
		});
	});

	describe('url', function(){
		it('returns the default message', function(){
			var data = {
				url: 'gvhsjfhbkdsjv',
				another: 'http://www.fbvdsfhk.com'
			};

			var rules = {
				url: { url: true },
				another: { url: true }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'url', message: 'The attribute `url` must be formatted as an url'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				url: 'gvhsjfhbkdsjv',
				another: 'http://www.fbvdsfhk.com'
			};

			var rules = {
				url: { url: true },
				another: { url: true }
			};

			var messages = {
				url: {
					url: 'The url is not valid.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'url', message: 'The url is not valid.'}
			]);
		});
	});

	describe('ip', function(){
		it('returns the default message', function(){
			var data = {
				ip: 'http://www.fbvdsfhk.com',
				another: '192.168.0.23'
			};

			var rules = {
				ip: { ip: true },
				another: { ip: true }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'ip', message: 'The attribute `ip` must be formatted as an IP address'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				ip: 'http://www.fbvdsfhk.com',
				another: '192.168.0.23'
			};

			var rules = {
				ip: { ip: true },
				another: { ip: true }
			};

			var messages = {
				ip: {
					ip: 'The ip is not valid.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'ip', message: 'The ip is not valid.'}
			]);
		});
	});

	describe('between', function(){
		it('returns the default message', function(){
			var data = {
				number: 7,
				another: 5
			};

			var rules = {
				number: { between: [2, 6] },
				another: { between: [2, 6] }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must have a value between 2 and 6'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 7,
				another: 5
			};

			var rules = {
				number: { between: [2, 6] },
				another: { between: [2, 6] }
			};

			var messages = {
				number: {
					between: 'The value must be greater than 2 and less then 6.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The value must be greater than 2 and less then 6.'}
			]);
		});
	});

	describe('betweenStrict', function(){
		it('returns the default message', function(){
			var data = {
				number: 7,
				another: 6
			};

			var rules = {
				number: { betweenStrict: [2, 6] },
				another: { betweenStrict: [2, 6] }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must have a value between 2 and 6 inclusive'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 7,
				another: 6
			};

			var rules = {
				number: { betweenStrict: [2, 6] },
				another: { betweenStrict: [2, 6] }
			};

			var messages = {
				number: {
					betweenStrict: 'The value must be greater than 2 and less then 6.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The value must be greater than 2 and less then 6.'}
			]);
		});
	});

	describe('digits', function(){
		it('returns the default message', function(){
			var data = {
				number: 556999,
				another: 55699
			};

			var rules = {
				number: { digits: 5 },
				another: { digits: 5 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must be a number and its digits must have a length of 5'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 556999,
				another: 55699
			};

			var rules = {
				number: { digits: 5 },
				another: { digits: 5 }
			};

			var messages = {
				number: {
					digits: 'The number is incorrect.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The number is incorrect.'}
			]);
		});
	});

	describe('distinct', function(){
		it('returns the default message', function(){
			var data = {
				array: [1, 2, 3, 3, 5],
				another: [1, 2, 3, 4, 5],
				onemore: [
					{ number: 1 },
					{ number: 2 },
					{ number: 3 },
					{ number: 3 }
				]
			};

			var rules = {
				array: { distinct: true },
				another: { distinct: true },
				onemore: { distinct: 'number' }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'array', message: 'All the values of the attribute `array` must be different'},
				{field: 'onemore', message: 'All the values of the attribute `onemore` must be different'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				array: [1, 2, 3, 3, 5],
				another: [1, 2, 3, 4, 5],
				onemore: [
					{ number: 1 },
					{ number: 2 },
					{ number: 3 },
					{ number: 3 }
				]
			};

			var rules = {
				array: { distinct: true },
				another: { distinct: true },
				onemore: { distinct: 'number' }
			};

			var messages = {
				array: {
					distinct: 'The array must not contain repeated values.'
				},
				onemore: {
					distinct: 'The array must not contain repeated values.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'array', message: 'The array must not contain repeated values.'},
				{field: 'onemore', message: 'The array must not contain repeated values.'}
			]);
		});
	});

	describe('in', function(){
		it('returns the default message', function(){
			var data = {
				number: 7,
				another: 6
			};

			var rules = {
				number: { in: [2, 0, 9, 4] },
				another: { in: [2, 6, 8, 4] }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must be one of these: 2,0,9,4'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 7,
				another: 6
			};

			var rules = {
				number: { in: [2, 0, 9, 4] },
				another: { in: [2, 6, 8, 4] }
			};

			var messages = {
				number: {
					in: 'The number is invalid.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The number is invalid.'}
			]);
		});
	});

	describe('notIn', function(){
		it('returns the default message', function(){
			var data = {
				number: 9,
				another: 7
			};

			var rules = {
				number: { notIn: [2, 0, 9, 4] },
				another: { notIn: [2, 6, 8, 4] }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'number', message: 'The attribute `number` must not be one of these: 2,0,9,4'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				number: 9,
				another: 7
			};

			var rules = {
				number: { notIn: [2, 0, 9, 4] },
				another: { notIn: [2, 6, 8, 4] }
			};

			var messages = {
				number: {
					notIn: 'The number is invalid.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'number', message: 'The number is invalid.'}
			]);
		});
	});

	describe('requiredWith', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Man',
				age: 18
			};

			var rules = {
				otherfield: { requiredWith: ['age'] }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'otherfield', message: 'The attribute `otherfield` must be present only if age is present'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Man',
				age: 18
			};

			var rules = {
				otherfield: { requiredWith: ['age'] }
			};

			var messages = {
				otherfield: {
					requiredWith: 'The other field is required along with the age.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'otherfield', message: 'The other field is required along with the age.'}
			]);
		});
	});

	describe('requiredWithout', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Man'
			};

			var rules = {
				otherfield: { requiredWithout: ['age'] }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'otherfield', message: 'The attribute `otherfield` must be present only if age is not present'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Man'
			};

			var rules = {
				otherfield: { requiredWithout: ['age'] }
			};

			var messages = {
				otherfield: {
					requiredWithout: 'The other field is required if age is not filled.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'otherfield', message: 'The other field is required if age is not filled.'}
			]);
		});
	});

	describe('requiredIf', function(){
		it('returns the default message', function(){
			var data = {
				name: 'Man',
				age: 15
			};

			var rules = {
				parentName: { requiredIf: (schema) => schema['age'] < 18 }
			};

			expect(Inspector.verify(data, rules)).to.deep.equal([
				{field: 'parentName', message: 'The attribute `parentName` is required'}
			]);
		});

		it('returns a custom message', function(){
			var data = {
				name: 'Man',
				age: 15
			};

			var rules = {
				parentName: { requiredIf: (schema) => schema['age'] < 18 }
			};

			var messages = {
				parentName: {
					requiredIf: 'The parent name is required if person is less than 18 years old.'
				}
			};

			expect(Inspector.verify(data, rules, messages)).to.deep.equal([
				{field: 'parentName', message: 'The parent name is required if person is less than 18 years old.'}
			]);
		});
	});
});
