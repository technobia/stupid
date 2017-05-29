define(function(require) {
    'use strict';
	describe('ui/step2/cmvp/StepTwoController', function() {
		var StepTwoController = require('ui/step2/cmvp/StepTwoController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(StepTwoController);
	});
});
