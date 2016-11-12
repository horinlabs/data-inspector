var utils = {
	match: (value, pattern) => new RegExp(pattern).test(value),
	lessThan: (value1, value) => value1 < value,
	lessOrEqualThan: (value1, value) => value1 <= value,
	greaterThan: (value1, value) => value1 > value,
	greaterOrEqualThan: (value1, value) => value1 >= value,
	equal: (value1, value) => value1 === value,
	notIn: (value, arr) => !~arr.indexOf(value),
	checkType: (value, type) => {
		if(type === 'string'){
			return typeof value === 'string' || value instanceof String;
		} else if (type === 'array') {
			return Array.isArray(value);
		} else if (type === 'number') {
			return !isNaN(value);
		} else if (type === 'boolean') {
			return value === true || value === false;
		} else {
			return false;
		}
	},
	distinct: (entries, key) => {
		if(!utils.checkType(entries, 'array')){
			return false;
		}

		var foundValues = [];

		for(var entry of entries){
			var value = (key && typeof key === 'string') ? entry[key] : entry;

			if(~foundValues.indexOf(value)){
				return false;
			}

			foundValues.push(value);
		}

		return true;
	}
};

module.exports = utils;
