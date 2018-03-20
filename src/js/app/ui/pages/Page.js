import ViewportManager from '../utils/ViewportManager';

var Page = function() {
	this.init();
}

Page.prototype = {

	breakpoints: {

		"xs": 0,
		"sm": 544, // 34em Small screen / phone
		"md": 768, // 48em Medium screen / tablet
		"lg": 992, // 62em Large screen / desktop
		"xl": 1200 // 75em Extra large screen / wide desktop

	},

	init: function() {

		this.viewport = new ViewportManager({
			breakpoints: this.breakpoints,
			onCalculate: function() {

			}
		});

		this.initComponents();

	},
	
	initComponents: function() {

		//nothing to init
	
	}
}

export default Page