define(function(require) {
    'use strict';
    describe('ui/step1/cmvp/StepOneModel', function() {
        var StepOneModel = require('ui/step1/cmvp/StepOneModel');
        var PromiseHelper = require('test-helpers/Promise');

        var sut;
        beforeEach(function() {
            sut = StepOneModel.newInstance({Q: PromiseHelper.fake});
            sut.localStorage = {};
            sut.restAPI = {};
        });

        describe('initModel', function() {
            describe('when have step one in localstorage', function() {
                var actual, countries;
                beforeEach(function() {
                    var data = {
                        stepOne: {
                            numberInsured: 7,
                            requirement: [],
                            countryOfResidence: 'vietnam'
                        }
                    };
                    countries = [{country_name: 'Afghanistan', country_id: 1}];

                    sut.localStorage.get = jasmine.createSpy().and.returnValue(data);
                    sut.restAPI.getAllCountry = jasmine.createSpy().and.returnValue(PromiseHelper.fake(countries));
                    actual = sut.initModel();
                });

                it('should return expected', function() {
                    var expected = {
                        countries: countries,
                        numberInsured: 7,
                        requirement: [],
                        countryOfResidence: 'vietnam',
                        requirementList: [
                            'Outpatient cover',
                            'Dental cover',
                            'Optical cover',
                            'Maternity cover'
                        ]
                    };
                    expect(actual.getActualResult()).toEqual(expected);
                });

                it('should set countries', function() {
                    expect(sut.countries).toEqual(countries);
                });
            });

            describe('when local storage was empty', function() {
                it('should set expected', function() {
                    sut.localStorage.get = jasmine.createSpy();
                    sut.restAPI.getAllCountry = jasmine.createSpy().and.returnValue(PromiseHelper.fake([]));
                    var actual = sut.initModel();

                    expect(actual.getActualResult()).toEqual({
                        countryOfResidence: '',
                        numberInsured: undefined,
                        requirement: [],
                        countries: [],
                        requirementList: [
                            'Outpatient cover',
                            'Dental cover',
                            'Optical cover',
                            'Maternity cover'
                        ]
                    });
                });
            });
        });

        describe('makeSelect', function() {
            describe('when it not have in requirement', function() {
                it('should add it in requirement list', function() {
                    sut.requirement = [];
                    sut.makeSelect('something');
                    expect(sut.requirement).toEqual(['something']);
                });
            });

            describe('when it have in requirement', function() {
                it('should removed', function() {
                    sut.requirement = ['A', 'B', 'C'];
                    sut.makeSelect('B');
                    expect(sut.requirement).toEqual(['A', 'C']);
                });
            });

            describe('BUG', function() {
                it('should like expected', function() {
                    sut.requirement = ['A'];
                    sut.makeSelect('A');
                    expect(sut.requirement).toEqual([]);
                });
            });
        });

        describe('save', function() {
            it('should save to localstorage', function() {
                var spy = sut.localStorage.set = jasmine.createSpy();
                sut.save({});
                expect(spy).toHaveBeenCalledWith('data', {stepOne: {}});
            });
        });

        describe('filterCountries', function() {
            describe('when get undefined', function() {
                it('should return original countries list', function() {
                    sut.countries = [];
                    expect(sut.filterCountries()).toEqual([]);
                });
            });

            describe('when get some keyword', function() {
                it('should return filter list', function() {
                    sut.countries = [
                        {country_name: 'NAME WITH UPPERCASE'},
                        {country_name: 'name with lowercase'},
                        {country_name: 'some thing else'}
                    ];
                    expect(sut.filterCountries('Name')).toEqual([sut.countries[0], sut.countries[1]]);
                });
            });
        });
    });
});
