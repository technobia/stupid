define(function(require) {
    'use strict';
    describe('ui/plan/PlanView', function() {
        var PlanView = require('ui/plan/PlanView');
        var ViewHelper = require('test-helpers/View');

        var sut;
        beforeEach(function() {
            sut = ViewHelper.exerciseCreate(PlanView);
        });

        var getSut = function() {
            return sut;
        };
        ViewHelper.testShowCallsPresenterShow(getSut);
        ViewHelper.testShowMethodsAreDefined(getSut);
        ViewHelper.testInitFn(getSut, ['onSelectFromCountry', 'onSelectResideCountry', 'onSelectArea', 'isShowSpouse', 'isShowKid', 'checkShowAddMoreKid']);

        describe('initData', function() {
            describe('always', function() {
                beforeEach(function() {
                    spyOn(sut, 'selectFromCountry');
                    spyOn(sut, 'selectResideCountry');
                    spyOn(sut, 'selectArea');
                    sut.initData({});
                });

                it('should fill sut.data', function() {
                    expect(Object.keys(sut.data).length).toBeTruthy();
                });

                it('should call selects', function() {
                    expect(sut.selectFromCountry).toHaveBeenCalled();
                });

                it('should call selects', function() {
                    expect(sut.selectResideCountry).toHaveBeenCalled();
                });

                it('should call selects', function() {
                    expect(sut.selectArea).toHaveBeenCalled();
                });
            });
        });
    });
});
