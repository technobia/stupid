define(function(require) {
    'use strict';
	describe('ui/modal/cmvp/InformController', function() {
		var InformController = require('ui/modal/cmvp/InformController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(InformController);
	});
});
