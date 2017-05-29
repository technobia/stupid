define(function(require) {
    'use strict';
	describe('ui/result/ResultView', function() {
		var ResultView = require('ui/result/ResultView');
		var ViewHelper = require('test-helpers/View');

		var sut;
		beforeEach(function() {
			sut = ViewHelper.exerciseCreate(ResultView);
		});

		var getSut = function() { return sut; };
		ViewHelper.testShowCallsPresenterShow(getSut);
		ViewHelper.testShowMethodsAreDefined(getSut);
		ViewHelper.testInitFn(getSut, [
			'onOpenFilter',
			'onCloseFilterModal',
			'gotoBuyNow',
			'getChecked'
		]);

        describe('initData', function() {
            describe('always', function() {
                it('should fill sut.data', function() {
                	spyOn(sut, 'initDTO');
                	sut.data.filter = {
                		excess: 500
					};
                    sut.initData({});
                    expect(Object.keys(sut.data).length).toBeTruthy();
                });
            });
        });
	});
});
