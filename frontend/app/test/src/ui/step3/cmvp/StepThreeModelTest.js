define(function(require) {
	'use strict';
	describe('ui/step3/cmvp/StepThreeModel', function() {
		var StepThreeModel = require('ui/step3/cmvp/StepThreeModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut, restAPIStub;
		beforeEach(function() {
			restAPIStub = {};
			sut = StepThreeModel.newInstance({Q: PromiseHelper.fake, restAPI: restAPIStub});
			sut.money = {};
		});

		describe('initModel', function() {
			beforeEach(function() {
				sut.restAPI.filterPlans = jasmine.createSpy().and.returnValue({
					plans: []
				});
				sut.restAPI.getMasterArea = jasmine.createSpy();
				sut.localStorage.get = jasmine.createSpy().and.returnValue({
					data: {}
				});
				var country = [{}];
				var masterAreaOfCover = [{key_1: '1'}, {key_2: '2'}];
				sut.Q.all = jasmine.createSpy().and.returnValue(PromiseHelper.fake([country, masterAreaOfCover]));
			});
		});

		describe('_initDefaultFilter', function() {
			it('should return expected default filter', function() {
				sut.data = {
					stepOne: {
						numberInsured: 1,
						countryOfResidence: {
							country_id: 1,
							country_name: 'Vietnam'
						},
						requirement: []
					},
					stepTwo: {
						persons: [
							{
								masterAreaOfCover: {master_area_id: 1, master_area_name: 'Asia'},
								nationality: {country_id: 2, country_name: 'USA'}
							},
							{nationality: {country_id: 2, country_name: 'USA'}}
						]
					}
				};
				var expected = {
					masterAreaOfCoverObject: {master_area_id: 1, master_area_name: 'Asia'},
					masterAreaOfCover: 1,
					countryOfResidence: 1,
					outpatientCover: 0,
					dentalCover: 0,
					maternityCover: 0,
					opticalCover: 0,
					excess: '500',
					maximumCover: '90000',
					nationalityObject: {country_id: 2, country_name: 'USA'},
					nationality: 2,
					numberInsured: 1,
					persons: [
						{masterAreaOfCover: {master_area_id: 1, master_area_name: 'Asia'}, nationality: 'USA'},
						{nationality: 'USA'}
					],
					page: 1
				};

				sut.page = 1;
				sut._initDefaultFilter();
				expect(sut.filter).toEqual(expected);
			});
		});

		describe('_beforeFilter', function() {
			it('should convert number to string', function() {
				var filter = {
					outpatientCover: 1,
					dentalCover: 1,
					maternityCover: 1,
					opticalCover: 1
				};
				var actual = sut._beforeFilter(filter);
				Object.keys(actual).forEach(function(e) {
					expect(typeof actual[e]).toBe('string');
				});
			});
		});

        describe('_sortPlans', function() {
            it('should sort plans list based on total', function() {
                sut.plans = [
                    {totalAnnualPremium: 'USD 2'},
                    {totalAnnualPremium: 'USD 1'},
                    {totalAnnualPremium: 'USD 3'}
                ];
                var expected = [
                    {totalAnnualPremium: 'USD 1'},
                    {totalAnnualPremium: 'USD 2'},
                    {totalAnnualPremium: 'USD 3'}
                ];
                sut._sortPlans();
                expect(sut.plans).toEqual(expected);
            });

            it('should sort correctly', function() {
                sut.plans = [
                    {totalAnnualPremium: 'USD 2'},
                    {totalAnnualPremium: 'USD 111'},
                    {totalAnnualPremium: 'USD 33'}
                ];
                var expected = [
                    {totalAnnualPremium: 'USD 2'},
                    {totalAnnualPremium: 'USD 33'},
                    {totalAnnualPremium: 'USD 111'}
                ];
                sut._sortPlans();
                expect(sut.plans).toEqual(expected);
            });
        });
    });
});
