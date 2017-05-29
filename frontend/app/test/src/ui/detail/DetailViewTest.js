define(function(require) {
    'use strict';
	describe('DetailView', function() {
		var DetailView = require('ui/detail/DetailView');
		var ViewHelper = require('test-helpers/View');

		var sut;
		beforeEach(function() {
			sut = ViewHelper.exerciseCreate(DetailView);
			sut.$rootScope = {};
		});

		var getSut = function() { return sut; };
		ViewHelper.testShowCallsPresenterShow(getSut);
		ViewHelper.testShowMethodsAreDefined(getSut);
		ViewHelper.testInitFn(getSut, ['getChecked', 'gotoAskUs', 'gotoBuyNow']);

        describe('initData', function() {
            describe('always', function() {
                it('should fill sut.data', function() {
                    sut.initData({
						plans: []
					});
                    expect(Object.keys(sut.data).length).toBeTruthy();
                });
            });
        });
	});
});
