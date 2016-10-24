var moment = require('moment');
var utils = require('./utils');

var validators = {
	required: (schema, field, rule) => !rule ? true : !!schema[field],
	type: (schema, field, rule) => utils.checkType(schema[field], rule),
	pattern: (schema, field, rule) => utils.match(schema[field], rule),
	exactLength: (schema, field, rule) => utils.equal(schema[field].length, rule),
	minLength: (schema, field, rule) => utils.greaterOrEqualThan(schema[field].length, rule),
	maxLength: (schema, field, rule) => utils.lessOrEqualThan(schema[field].length, rule),
	lengthBetween: (schema, field, rule) => validators.minLength(schema, field, rule[0]) && validators.maxLength(schema, field, rule[1]),
	lessThan: (schema, field, rule) => schema[field] < rule,
	lessOrEqualThan: (schema, field, rule) => schema[field] <= rule,
	greaterThan: (schema, field, rule) => schema[field] > rule,
	greaterOrEqualThan: (schema, field, rule) => schema[field] >= rule,
	equal: (schema, field, rule) => schema[field] === rule,
	notEqual: (schema, field, rule) => schema[field] !== rule,
	accepted: (schema, field) => !utils.notIn(schema[field], ['yes', 'on', 1, true]),
	afterDate: (schema, field, rule) => moment(schema[field]).isAfter(rule),
	beforeDate: (schema, field, rule) => moment(schema[field]).isBefore(rule),
	equalDate: (schema, field, rule) => moment(schema[field]).isSame(rule),
	equalOrBeforeDate: (schema, field, rule) => moment(schema[field]).isSameOrBefore(rule),
	equalOrAfterDate: (schema, field, rule) => moment(schema[field]).isSameOrAfter(rule),
	betweenDates: (schema, field, rule) => moment(schema[field]).isBetween(rule[0], rule[1]),
	alpha: (schema, field) => utils.match(schema[field], /^[a-z]+$/i),
	alphaDash: (schema, field) => utils.match(schema[field], /^[\w\-]+$/),
	alphaNumeric: (schema, field) => utils.match(schema[field], /^[a-z0-9]+$/i),
	email: (schema, field) => utils.match(schema[field], /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i),
	url: (schema, field) => utils.match(schema[field], /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/),
	ip: (schema, field) => utils.match(schema[field], /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/),
	between: (schema, field, rule) => utils.greaterThan(schema[field], rule[0]) && utils.lessThan(schema[field], rule[1]),
	betweenStrict: (schema, field, rule) => utils.greaterOrEqualThan(schema[field], rule[0]) && utils.lessOrEqualThan(schema[field], rule[1]),
	digits: (schema, field, rule) => utils.checkType(schema[field], 'number') && (new String(schema[field])).length === rule,
	distinct: (schema, field, rule) => utils.distinct(schema[field], rule),
	in: (schema, field, rule) => !utils.notIn(schema[field], rule),
	notIn: (schema, field, rule) => utils.notIn(schema[field], rule),
	requiredWith: (schema, field, rule) => rule.reduce((prev, curr) => prev || !!schema[curr], false) ? !!schema[field] : true,
	requiredWithout: (schema, field, rule) => rule.reduce((prev, curr) => prev && !!schema[curr], true) ? true : !!schema[field],
	requiredIf: (schema, field, rule) => (rule(schema) === true) ? validators.required(schema, field, true) : true
};

module.exports = validators;
