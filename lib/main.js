var validators = require('./validators');
var defaults = require('./messages');
var sprintf = require('sprintf-js').sprintf;

var noop = () => true;

module.exports = {
	verify(data, schema, messages){
		messages = messages || {};
		var errors = [];

		Object.keys(schema).forEach((fieldName) => {
			var rules = schema[fieldName];
			var ruleTypes = Object.keys(rules);

			ruleTypes.forEach((ruleType) => {
				var validator = noop;

				if(rules[ruleType] instanceof Function){
					validator = rules[ruleType];
				} else if (validators[ruleType] instanceof Function) {
					validator = validators[ruleType];
				}

				try {
					if(!validator(data, fieldName, rules[ruleType])){
						throw new Error();
					}
				} catch (e) {
					var message = messages[fieldName] || {};

					errors.push({
						field: fieldName,
						message: message[ruleType] || sprintf(defaults[ruleType], fieldName, rules[ruleType])
					});
				}
			});
		});

		return errors;
	}
};
