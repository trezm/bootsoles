module.exports = {
	extendedDictionaryGet: function(keyString, dictionary) {
		var keys = keyString.split('.');
		var currentValue = dictionary;
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			
			currentValue = currentValue[key];
			if (currentValue == undefined) {
				return undefined
			}
		}

		return currentValue;
	}
}