define(function(require) {
    'use strict';
	describe('ui/step2/cmvp/StepTwoView', function() {
		var StepTwoView = require('ui/step2/cmvp/StepTwoView');
		var ViewHelper = require('test-helpers/View');

		var sut;
		beforeEach(function() {
			sut = ViewHelper.exerciseCreate(StepTwoView);
		});

		var getSut = function() { return sut; };
		ViewHelper.testShowCallsPresenterShow(getSut);
		ViewHelper.testShowMethodsAreDefined(getSut);
		ViewHelper.testInitFn(getSut, ['onKeyupCountriesSearch']);

        describe('initData', function() {
            describe('always', function() {
                it('should fill sut.data', function() {
                    sut.initData({
						countries: [],
						masterAreaOfCover: []
					});
                    expect(Object.keys(sut.data).length).toBeTruthy();
                });
            });
        });

		describe('_makeSelectList', function() {
			it('should make age list', function() {
				sut.data.countries = [];
				sut.data.masterAreaOfCover = [];
				sut._makeSelectList();
				expect(sut.data.age.length).toBe(70);
			});
		});
	});
});
