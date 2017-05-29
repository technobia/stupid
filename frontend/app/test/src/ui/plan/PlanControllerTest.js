define(function(require) {
    'use strict';
	describe('ui/plan/PlanController', function() {
		var PlanController = require('ui/plan/PlanController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(PlanController);
	});
});
