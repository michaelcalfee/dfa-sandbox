const utils = {
	
	log: function(value) {

		if (window.console && typeof console.log == "function") {
			console.log(value);
		}

	},
	
	error: function(value) {

		if (window.console && typeof console.error == "function") {
			console.error(value);
		}

	},

	extend: function(supertype, subtype, overrides) {

		var ctor = function() { },
			name;
		
		ctor.prototype = supertype.prototype;
		subtype.prototype = new ctor();

		for (name in overrides) {
			subtype.prototype[name] = overrides[name];
		}

		subtype.prototype.constructor = supertype;

	}
}

export default utils