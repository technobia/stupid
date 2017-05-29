define(function(require) {
    'use strict';
	describe('ui/buy-now/BuyNowController', function() {
		var BuyNowController = require('ui/buy-now/BuyNowController');
		var ControllerHelper = require('test-helpers/Controller');
		ControllerHelper.testCallsViewShow(BuyNowController);
	});
});
