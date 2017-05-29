define(function(require) {
    'use strict';
    describe('ui/step2/cmvp/StepTwoModel', function() {
        var StepTwoModel = require('ui/step2/cmvp/StepTwoModel');
        var PromiseHelper = require('test-helpers/Promise');

        var sut;
        beforeEach(function() {
            sut = StepTwoModel.newInstance({Q: PromiseHelper.fake});
            sut.restAPI = {};
            sut.localStorage = {};
            sut.Q = {};
        });

        describe('initModel', function() {
            var actual;
            beforeEach(function() {
                sut.restAPI.getAllCountry = jasmine.createSpy();
                sut.restAPI.getMasterArea = jasmine.createSpy();
                sut.localStorage.get = jasmine.createSpy().and.returnValue({
                    stepOne: {}
                });
                var country = [{country_name: 'Afghanistan', country_id: 1}];
                var masterAreaOfCover = [{key_1: '1'}, {key_2: '2'}];
                sut.Q.all = jasmine.createSpy().and.returnValue(PromiseHelper.fake([country, masterAreaOfCover]));
                actual = sut.initModel();
            });

            it('should return dto', function() {
                var dto = {
                    stepOne: {},
                    countries: [{country_name: 'Afghanistan', country_id: 1}],
                    masterAreaOfCover: [{key_1: '1'}, {key_2: '2'}],
                    persons: []
                };
                expect(actual.getActualResult()).toEqual(dto);
            });
        });

        describe('save', function() {
            it('should save to local storage', function() {
                var spy = sut.localStorage.set = jasmine.createSpy();
                var data = {stepOne: {}, stepTwo: {}};
                sut.stepOne = {};
                sut.save({});
                expect(spy).toHaveBeenCalledWith('data', data);
            });
        });

        describe('_makePersonList', function() {
            it('should set list persons based on number insured', function() {
                sut.stepOne = {countryOfResidence: {country_id: 1, country_name: 'VN'}};
                sut.stepTwo = {};
                sut._makePersonList(1);
                var actual = sut.persons.map(function(e) {
                    delete e.id;
                    return e;
                });
                expect(actual).toEqual([{
                    age: '',
                    gender: '',
                    nationality: '',
                    relationShip: '',
                    masterAreaOfCover: ''
                }]);
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
