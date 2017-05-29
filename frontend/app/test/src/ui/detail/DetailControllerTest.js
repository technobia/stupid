define(function(require) {
    'use strict';
	describe('DetailController', function() {
		var DetailController = require('ui/detail/DetailController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(DetailController);
	});
});
