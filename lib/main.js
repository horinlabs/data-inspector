var validators = require('./validators');
var defaults = require('./messages');

var noop = () => true;

module.exports = {
	verify(data, schema, messages){
		var errors = [];

		Object.keys(schema).forEach((fieldName) => {
			var rules = schema[fieldName];
			var ruleTypes = Object.keys(rules);

			ruleTypes.forEach((ruleType) => {
				var validator = validators[ruleType] || noop;

				if(!validator(data, fieldName, rules[ruleType])){
					var message = messages[fieldName];

					errors.push({
						field: fieldName,
						message: message ? message[ruleType] : defaults[ruleType]
					});
				}
			});
		});

		return errors;
	}
};
