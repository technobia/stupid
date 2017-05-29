define(function(require) {
    'use strict';
	describe('ui/ask-us/AskUsController', function() {
		var AskUsController = require('ui/ask-us/AskUsController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(AskUsController);
	});
});
