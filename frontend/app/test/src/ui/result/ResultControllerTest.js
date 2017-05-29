define(function(require) {
    'use strict';
	describe('ui/result/ResultController', function() {
		var ResultController = require('ui/result/ResultController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(ResultController);
	});
});
