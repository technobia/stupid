define(function(require) {
    'use strict';
	describe('ui/header/HeaderController', function() {
		var HeaderController = require('ui/header/HeaderController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(HeaderController);
	});
});
