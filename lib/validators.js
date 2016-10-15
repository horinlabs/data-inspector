var validators = {
	required: (schema, field, value) => !value ? true : !!schema[field],
	type: (schema, field, value) => typeof schema[field] === value,
	pattern: (schema, field, value) => !!schema[field].match(value),
	exactLength: (schema, field, value) => schema[field].length === value,
	minLength: (schema, field, value) => schema[field].length >= value,
	maxLength: (schema, field, value) => schema[field].length <= value,
	lt: (schema, field, value) => schema[field] < value,
	lte: (schema, field, value) => schema[field] <= value,
	gt: (schema, field, value) => schema[field] > value,
	gte: (schema, field, value) => schema[field] >= value,
	eq: (schema, field, value) => schema[field] === value,
	ne: (schema, field, value) => schema[field] !== value
};

module.exports = validators;
