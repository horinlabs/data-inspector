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

Inspector.verify(data, rules, messages);

//outputs: [{field: 'description', message: 'The Pokémon description must have at least length of 20.'}]
```

* * *
## Validation types

### required

The attribute `%s` is required

### type

The attribute `%s` must be of type %s

### pattern

The attribute `%s` is invalid

### exactLength

The attribute `%s` must have the exact length of %d

### minLength

The attribute `%s` must have a minimum length of %d

### maxLength

The attribute `%s` must have a maximum length of %d

### lessThan

The attribute `%s` must have a value less than %d

### lessOrEqualThan

The attribute `%s` must have a value less than or equal %d

### greaterThan

The attribute `%s` must have a value greater than %d

### greaterOrEqualThan

The attribute `%s` must have a value greater than or equal %d

### equal

The attribute `%s` must have a value equal %d

### notEqual

The attribute `%s` must not have a value equal %d

### accepted

The attribute `%s` must be accepted

### afterDate

The attribute `%s` must be a date after %s

### beforeDate

The attribute `%s` must be a date before %s

### equalDate

The attribute `%s` must be a date equal %s

### equalOrBeforeDate

The attribute `%s` must be a date before or equal %s

### equalOrAfterDate

The attribute `%s` must be a date after or equal %s

### betweenDates

The attribute `%s` must be of the type %2[0]$s and %2[1]$s

### validator

The attribute `%s` must match the validator

### alpha

The attribute `%s` must be entirely alphabetic characters

### alphaDash

The attribute `%s` may have alpha-numeric characters, as well as dashes and underscores

### alphaNumeric

The attribute `%s` must be entirely alpha-numeric characters

### email

The attribute `%s` must be formatted as an email address

### url

The attribute `%s` must be formatted as an url

### ip

The attribute `%s` must be formatted as an IP address

### between

The attribute `%s` must have a value between %2[0]$s and %2[1]$s

### betweenStrict

The attribute `%s` must have a value between %2[0]$s and %2[1]$s inclusive

### different

The attribute `%s` must have a value different than %s

### digits

The attribute `%s` must have a value a number the length of %d

### distinct

All the values of the attribute `%s` must be different

### in

The attribute `%s` must be included in %s

### notIn

The attribute `%s` must not be included in %s

### requiredWith

The attribute `%s` must be present only if at least one of %s are present

### requiredWithout

The attribute `%s` must be present only if at least one of %s are not present
