import 'babel-polyfill';
import utils from './utils';
import pages from './pages';

if (!window._currentPage) {
	
	utils.log('ERROR: Current page object not defined');

}
else {
	
	let pageType = window._currentPage.type;

	if (!pageType) {
	
		utils.log('ERROR: Current page type property not defined');
	
	}
	else {
	
		let pageConstructor = pages[pageType];
		
		if (typeof pageConstructor !== 'function') {
	
			utils.log('ERROR: Unable to initialize type: ' + pageType);
	
		}
		else {
	
			utils.log('Initializing: ' + pageType);
			new pages[pageType](document.getElementById('page'));
	
		}
	}
}