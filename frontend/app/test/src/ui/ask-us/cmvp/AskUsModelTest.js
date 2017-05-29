define(function(require) {
    'use strict';
	describe('ui/ask-us/AskUsModel', function() {
		var AskUsModel = require('ui/ask-us/AskUsModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut;
		beforeEach(function() {
            sut = AskUsModel.newInstance({Q: PromiseHelper.fake});
            sut.$rootScope = {};
		});

        describe('initModel', function() {
            describe('when no have any plan', function() {
                it('should throw an error', function() {
                    expect(sut.initModel.bind(sut)).toThrowError('Invalid plan');
                });
            });
        });

		xdescribe('askUs', function() {
			it('should call to apply with expected data', function() {
				var spy = sut.restAPI.askUs = jasmine.createSpy();
				sut.plan = {plan_id: 1};
				sut.data = {stepOne: {numberInsured: 1, countryOfResidence: {country_name: 'VietNam'}}, stepTwo: {persons: []}};
				sut.askUs({});
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
