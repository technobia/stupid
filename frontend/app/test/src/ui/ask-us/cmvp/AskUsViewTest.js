define(function(require) {
    'use strict';
	describe('ui/ask-us/AskUsView', function() {
		var AskUsView = require('ui/ask-us/AskUsView');
		var ViewHelper = require('test-helpers/View');

		var sut;
		beforeEach(function() {
			sut = ViewHelper.exerciseCreate(AskUsView);
		});

		var getSut = function() { return sut; };
		ViewHelper.testShowCallsPresenterShow(getSut);
		ViewHelper.testShowMethodsAreDefined(getSut);
		ViewHelper.testInitFn(getSut, ['redirectTo', 'getChecked']);

        describe('initData', function() {
            describe('always', function() {
                it('should fill sut.data', function() {
                    sut.initData({});
                    expect(Object.keys(sut.data).length).toBeTruthy();
                });
            });
        });
	});
});
