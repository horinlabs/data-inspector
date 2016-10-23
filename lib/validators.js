var moment = require('moment');
var utils = require('./utils');

var validators = {
	required: (schema, field, value) => !value ? true : !!schema[field],
	type: (schema, field, value) => utils.checkType(schema[field], value),
	pattern: (schema, field, value) => utils.match(schema[field], value),
	exactLength: (schema, field, value) => utils.equal(schema[field].length, value),
	minLength: (schema, field, value) => utils.greaterOrEqualThan(schema[field].length, value),
	maxLength: (schema, field, value) => utils.lessOrEqualThan(schema[field].length, value),
	lengthBetween: (schema, field, value) => validators.minLength(schema, field, value[0]) && validators.maxLength(schema, field, value[1]),
	lessThan: (schema, field, value) => schema[field] < value,
	lessOrEqualThan: (schema, field, value) => schema[field] <= value,
	greaterThan: (schema, field, value) => schema[field] > value,
	greaterOrEqualThan: (schema, field, value) => schema[field] >= value,
	equal: (schema, field, value) => schema[field] === value,
	notEqual: (schema, field, value) => schema[field] !== value,
	accepted: (schema, field) => !utils.notIn(schema[field], ['yes', 'on', 1, true]),
	afterDate: (schema, field, value) => moment(schema[field]).isAfter(value),
	beforeDate: (schema, field, value) => moment(schema[field]).isBefore(value),
	equalDate: (schema, field, value) => moment(schema[field]).isSame(value),
	equalOrBeforeDate: (schema, field, value) => moment(schema[field]).isSameOrBefore(value),
	equalOrAfterDate: (schema, field, value) => moment(schema[field]).isSameOrAfter(value),
	betweenDates: (schema, field, value) => moment(schema[field]).isBetween(value[0], value[1]),
	alpha: (schema, field) => utils.match(schema, field, /^[a-z]+$/i),
	alphaDash: (schema, field) => utils.match(schema, field, /^[a-z0-9_-]+$/i),
	alphaNumeric: (schema, field) => utils.match(schema, field, /^[a-z0-9]+$/i),
	email: (schema, field) => utils.match(schema, field, /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i),
	url: (schema, field) => utils.match(schema, field, /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),
	ip: (schema, field) => utils.match(schema, field, /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/),
	between: (schema, field, value) => utils.greaterThan(schema[field], value[0]) && utils.lessThan(schema[field], value[1]),
	betweenStrict: (schema, field, value) => utils.greaterOrEqualThan(schema[field], value[0]) && utils.lessOrEqualThan(schema[field], value[1]),
	different: (schema, field, value) => utils.notEqual(schema[field], schema[value]),
	digits: (schema, field, value) => utils.checkType(schema[field], 'number') && (new String(schema[field])).length === value,
	distinct: (schema, field, value) => utils.distict(schema[field], value),
	in: (schema, field, value) => !utils.notIn(value, schema[field]),
	notIn: (schema, field, value) => utils.notIn(value, schema[field]),
	requiredWith: (schema, field, value) => value.reduce((prev, curr) => prev || !!schema[curr], false) ? !!schema[field] : true,
	requiredWithout: (schema, field, value) => value.reduce((prev, curr) => prev && !!schema[curr], true) ? true : !!schema[field]
};

module.exports = validators;
