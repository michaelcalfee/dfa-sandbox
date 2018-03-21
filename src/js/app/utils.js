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

	isInView: function(element) {

		//is above top of viewport
		if (window.pageYOffset + (window.innerHeight / 4) > utils.getElementOffset(element).top + element.clientHeight) {
			return 'top';
		}
		//is below bottom of viewport
		if (utils.getElementOffset(element).top + (window.innerHeight / 4)  > window.pageYOffset + window.innerHeight) {
			return 'bottom';
		}
		//is in viewport
		else {
			return true;
		}
  
	},

	getElementOffset: function(element) {
		var rect = element.getBoundingClientRect();
		var win = element.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
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