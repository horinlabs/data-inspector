var validators = require('./validators');
var defaults = require('./messages');

var noop = () => true;

module.exports = {
	verify(data, schema, messages, options){
		messages = messages || {};
		options = options || {};
		var errors = (options.minimal) ? {} : [];

		Object.keys(schema).forEach((fieldName) => {
			var rules = schema[fieldName];
			var ruleTypes = Object.keys(rules);

			ruleTypes.forEach((ruleType) => {
				var validator = noop;

				if (validators[ruleType] instanceof Function) {
					validator = validators[ruleType];
				} else if(rules[ruleType] instanceof Function){
					validator = rules[ruleType];
				}

				try {
					if(!validator(data, fieldName, rules[ruleType])){
						var message = messages[fieldName] || {};
						throw new Error(message[ruleType] || defaults[ruleType](fieldName, rules[ruleType]));
					}
				} catch (e) {
					if(options.minimal){
						if(!errors[fieldName]){
							errors[fieldName] = e.message;
						}
					} else {
						errors.push({
							field: fieldName,
							message: e.message
						});
					}
				}
			});
		});

		return errors;
	}
};
