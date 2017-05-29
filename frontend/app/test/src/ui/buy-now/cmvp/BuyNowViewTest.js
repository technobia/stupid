define(function(require) {
    'use strict';
	describe('ui/buy-now/BuyNowView', function() {
		var BuyNowView = require('ui/buy-now/BuyNowView');
		var ViewHelper = require('test-helpers/View');

		var sut;
		beforeEach(function() {
			sut = ViewHelper.exerciseCreate(BuyNowView);
		});

		var getSut = function() { return sut; };
		ViewHelper.testShowCallsPresenterShow(getSut);
		ViewHelper.testShowMethodsAreDefined(getSut);
		ViewHelper.testInitFn(getSut, ['redirectTo', 'getChecked']);

        describe('initData', function() {
            describe('always', function() {
                it('should fill sut.data', function() {
                    sut.initData({});
                    expect(Object.keys(sut.data)).toEqual(['plan']);
                });
            });
        });
	});
});
