
import Page from './Page';
import utils from '../../utils';
import { throttle } from 'underscore';
import { bind } from 'underscore';

var ContentPage = function() {
	Page.apply(this, arguments);
};

utils.extend(Page, ContentPage, {

    init: function() {

        Page.prototype.init.apply(this, arguments);

        this.sections = document.querySelectorAll('section');
        this.chart = document.querySelectorAll('.chart')[0];

        window.addEventListener('scroll', throttle(bind(this.onScroll_window, this), 100));
    },

    onScroll_window: function() {
        this.sections.forEach(bind(this.updateView, this));
    },

    updateView: function(el) {
        //keep chart in viewport at all times
        this.chart.style.top = window.pageYOffset + 'px';

        //update the chart content based on active section
        if (utils.isInView(el) === true) {
            utils.log(el.firstElementChild.innerHTML + ' is in view.');
            if (utils.getElementOffset(this.chart).top >=  utils.getElementOffset(el).top) {
                //update the chart content
                this.chart.innerHTML = el.firstElementChild.innerHTML;
            }
        }
    }

});

export default ContentPage