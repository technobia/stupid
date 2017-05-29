define(function(require) {
	'use strict';
	describe('ui/step3/cmvp/StepThreeView', function() {
		var StepThreeView = require('ui/step3/cmvp/StepThreeView');
		var ViewHelper = require('test-helpers/View');

		var sut;
		beforeEach(function() {
			sut = ViewHelper.exerciseCreate(StepThreeView);
		});

		var getSut = function() {
			return sut;
		};
		ViewHelper.testShowCallsPresenterShow(getSut);
		ViewHelper.testShowMethodsAreDefined(getSut);
		ViewHelper.testInitFn(getSut, ['redirectTo', 'scrollTop', 'beforeFilter']);

		describe('initData', function() {
		    describe('always', function() {
		        it('should fill sut.data', function() {
				spyOn(sut, '_initDefaultOptions');
				spyOn(sut, '_initDataExcess');
				spyOn(sut, '_initDataMaximumCover');
				spyOn(sut, '_initPagination');
		            sut.initData({});
		            expect(Object.keys(sut.data).length).toBeTruthy();
		        });
		    });
		});

		describe('redirectToStepOne', function() {
			beforeEach(function() {
				sut.$location = {
					path: jasmine.createSpy().and.returnValue('/step-1')
				};
				sut.redirectToStepOne();
			});

			it('should be redirect to Step 1', function() {
				expect(sut.$location.path()).toEqual('/step-1');
			});
		});
	});
});
