define(function(require) {
    'use strict';
	describe('ui/step1/cmvp/StepOneController', function() {
		var StepOneController = require('ui/step1/cmvp/StepOneController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(StepOneController);
	});
});
