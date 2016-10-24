# Data Inspector

A simple library to make easy validating Objects in Javascript.

How to install:
`npm install data-inspector`

### Example

```
var Inspector = require('data-inspector');

var data = {
	name: 'Squirtle',
	description: 'A small Pokémon.',
	type: 'water'
};

var rules = {
	name: { type: 'string', alpha: true, minLength: 5 },
	description: { type: 'string', minLength: 20 },
	type: { type: 'string', pattern: /^(fire|water|grass)$/ },
};

var messages = {
	description: {
		type: 'The Pokémon description must be a text.',
		minLength: 'The Pokémon description must have at least length of 20.'
	}
};

Inspector.verify(data, rules, messages);

//outputs: [{field: 'description', message: 'The Pokémon description must have at least length of 20.'}]
```

* * *
## Built-in validation types

### required

The attribute is required

### type

The attribute must be of a given type. Accepted values are `string`, `array`, `number` or `boolean`.

### pattern

The attribute must match a given regex.

### exactLength

The attribute must have the exact given length.

### minLength

The attribute must have a minimum given length.

### maxLength

The attribute must have a maximum given length.

### lessThan

The attribute must have a value less than the rule.

### lessOrEqualThan

The attribute must have a value less than or equal than the rule.

### greaterThan

The attribute must have a value greater than the rule.

### greaterOrEqualThan

The attribute must have a value greater than or equal than the rule.

### equal

The attribute must have a value equal the rule.

### notEqual

The attribute must not have a value equal the rule.

### accepted

The attribute must be 'yes', 'on', 1 or true.

### afterDate

The attribute must be a valid date after the one passed on the rule.

### beforeDate

The attribute must be a valid date before the one passed on the rule.

### equalDate

The attribute must be a valid date equal the one passed one the rule.

### equalOrBeforeDate

The attribute must be a date before or equal the one passed one the rule.

### equalOrAfterDate

The attribute must be a date after or equal the one passed one the rule.

### betweenDates

The attribute must be a date between two dates. Accepted rule value is an array which the first value is the initialDate and the second is the finalDate.

### alpha

The attribute must be entirely alphabetic characters.

### alphaDash

The attribute may have alpha-numeric characters, as well as dashes and underscores.

### alphaNumeric

The attribute must be entirely alpha-numeric characters.

### email

The attribute must be formatted as an email address.

### url

The attribute must be formatted as an url.

### ip

The attribute must be formatted as an IP address.

### between

The attribute must have a value between two values. Accepted rule value is an array which the first value is the initialValue and the second is the finalValue.

### betweenStrict

The same of above rule, but using strict validation.

### digits

The attribute must be a number and has a value where its digits matches the value on the rule.

### distinct

The attribute must be an array and all its values must be different.

### in

The attribute must be included in the given array.

### notIn

The attribute must not be included in thee given array.

### requiredWith

The attribute must be present only if at least one of the attributes in array are present.

### requiredWithout

The attribute must be present only if at least one of attributes in array are not present

### requiredIf

The attribute must be present only if the function passed in `requiredIf` returns `true`

*Note:* For a solid example of each validator, please have a look at lib/data-inspector.spec.js

## Custom rules

Ok, we have a bunch of validators, but let's suppose you want a very specific rule. You totally can! Here's how:

```
var data = {
	name: 'Pikachu',
	type: 'eletric',
	description: 'Useless Pokemon.'
};

var rules = {
	type: {
		theBest: function(schema, field, value){
			return value === 'water' && value !== 'eletric';
		}
	}
};

var messages = {
	type: {
		theBest: 'The Pokémon must be of type water, not eletric.'
	}
};

Inspector.verify(data, rules, messages) //[{field: 'type', message: 'The Pokémon must be of type water, not eletric.'}]
```
*Note:* if you add a custom rule that already exists in the validators above, the default one will be used. 
