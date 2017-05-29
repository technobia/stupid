define(function(require) {
	'use strict';
	describe('ui/buy-now/BuyNowModel', function() {
		var BuyNowModel = require('ui/buy-now/BuyNowModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut;
		beforeEach(function() {
			sut = BuyNowModel.newInstance({Q: PromiseHelper.fake});
			sut.$rootScope = {};
			sut.restAPI = {};
		});

		describe('initModel', function() {
			describe('when no have any plan', function() {
				it('should throw an error', function() {
					sut.$rootScope.plan = undefined;
					expect(sut.initModel.bind(sut)).toThrowError('Invalid plan');
				});
			});

			describe('when have plan on root scope', function() {
				it('should return that plan', function() {
					spyOn(sut, '_getData').and.returnValue({});
					expect(sut.initModel()).toEqual({});
				});
			});
		});

		xdescribe('apply', function() {
			it('should call to apply with expected data', function() {
				var spy = sut.restAPI.apply = jasmine.createSpy();
				sut.plan = {plan_id: 1};
				sut.apply({});
				var expected = {
					planId: 1,
					numberInsured: 1,
					countryOfResidence: 'VietNam',
					persons: [],
					userInfo: {}
				};
				expect(spy).toHaveBeenCalledWith(expected);
			});
		});
	});
});
