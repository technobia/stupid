define(function(require) {
    'use strict';
	describe('ui/step3/cmvp/StepThreeController', function() {
		var StepThreeController = require('ui/step3/cmvp/StepThreeController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(StepThreeController);
	});
});
