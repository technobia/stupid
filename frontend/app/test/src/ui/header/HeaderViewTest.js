define(function(require) {
    'use strict';
	describe('ui/header/HeaderView', function() {
		var HeaderView = require('ui/header/HeaderView');
		var ViewHelper = require('test-helpers/View');

		var sut;
		beforeEach(function() {
			sut = ViewHelper.exerciseCreate(HeaderView);
		});

		var getSut = function() { return sut; };
		ViewHelper.testShowCallsPresenterShow(getSut);
		ViewHelper.testShowMethodsAreDefined(getSut);
		ViewHelper.testInitFn(getSut, ['onClickBackButton', 'onOpenIntro']);

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
