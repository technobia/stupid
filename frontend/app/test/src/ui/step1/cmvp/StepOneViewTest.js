define(function(require) {
    'use strict';
    describe('ui/step1/cmvp/StepOneView', function() {
        var StepOneView = require('ui/step1/cmvp/StepOneView');
        var ViewHelper = require('test-helpers/View');

        var sut;
        beforeEach(function() {
            sut = ViewHelper.exerciseCreate(StepOneView);
        });

        var getSut = function() {
            return sut;
        };
        ViewHelper.testShowCallsPresenterShow(getSut);
        ViewHelper.testShowMethodsAreDefined(getSut);
        ViewHelper.testInitFn(getSut, ['checkExistRequirement', 'onKeyupCountriesSearch']);

        describe('initData', function() {
            describe('always', function() {
                it('should fill sut.data', function() {
                    sut.initData({});
                    expect(Object.keys(sut.data).length).toBeTruthy();
                });
            });
        });

        describe('_initNumberInsured', function() {
            it('should set number insured', function() {
                sut.allowMultiple = true;
                sut._initNumberInsured(1);
                expect(sut.data.numberInsured.length).toBe(7);
            });
        });

        describe('_initRequirement', function() {
            it('should set requirement', function() {
                sut.data.step = {};
                sut._initRequirement(['A', 'B', 'C']);
                expect(sut.data.requirementField).toBe('Hospital cover, A, B, C');
            });
        });
    });
});
