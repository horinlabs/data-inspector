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

Test if the field is present in the object.

### type

Test if the field type matches the desired value.

### pattern

Test if the field value matches the pattern.

### exactLength

Test if the field value has the desired exact length.

### minLength

Test if the field value has at least the desired length.

### maxLength

Test if the field value has the maximum of the desired length.

### lt

Test if the field value is less than the other value.

### lte

Test if the field is less than or equal other value.

### gt

Test if the field value is greater than the desired value.

### gte

Test if the field value is greater than or equal the desired value.

### eq

Test if the field value is equal the desired value.

### ne

Test if the field value is not equal the desired value.
