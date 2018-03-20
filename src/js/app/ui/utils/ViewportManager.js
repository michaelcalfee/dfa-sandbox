import { throttle } from 'underscore';
import { extend } from 'underscore';
import { bind } from 'underscore';
import utils from '../../utils';

var ViewportManager = function(options) {
	this.options = extend({
		breakpoints: {
			/* Example
			"sm": 0,
			"md": 641,
			"lg": 1024
			*/
		},
		onCalculate: function () {}
	}, options);
	
	this.currentBreakpoint = false;
	this.currentWidth = window.innerWidth;
	this.init();
};
	
ViewportManager.prototype = {

	init: function() {

		this.calcBreakpoint();
		window.addEventListener('resize', throttle(bind(this.calcBreakpoint, this), 100));

	},
	
	calcBreakpoint: function() {

		var tmpBreakpoint = false,
			bp;
		
		this.currentWidth = window.innerWidth;
		
		for (bp in this.options.breakpoints) {
			if (this.options.breakpoints.hasOwnProperty(bp)) {
				if (this.currentWidth >= this.options.breakpoints[bp]) {
					tmpBreakpoint = bp;
				}
				else {
					break;
				}
			}
		}
		
		if (tmpBreakpoint !== this.currentBreakpoint) {
			this.currentBreakpoint = tmpBreakpoint;
			this.options.onCalculate(this.currentBreakpoint, this.options.breakpoints[this.currentBreakpoint]);
			utils.log('Viewport: ' + '"' + this.currentBreakpoint + '" - ' + this.options.breakpoints[this.currentBreakpoint] + 'px');
		}

	},

	breakpointUp: function(bp) {

		return this.options.breakpoints[this.currentBreakpoint] >= this.options.breakpoints[bp];

	},

	breakpointDown: function(bp) {

		return this.options.breakpoints[this.currentBreakpoint] <= this.options.breakpoints[bp];

	}
	
};

export default ViewportManager