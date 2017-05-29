define(function(require) {
    'use strict';
	describe('ui/homepage/cmvp/HomepageController', function() {
		var HomepageController = require('ui/homepage/cmvp/HomepageController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(HomepageController);
	});
});
