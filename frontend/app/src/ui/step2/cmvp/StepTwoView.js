define(function(require) {
    'use strict';
    var StepTwoPresenter = require('ui/step2/cmvp/StepTwoPresenter');
    var StepTwoModel = require('ui/step2/cmvp/StepTwoModel');
    var BaseView = require('cmvp/views/BaseView');

    function StepTwoView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.$location = di.$location;
    }

    StepTwoView.newInstance = function(di) {
        di.$location = di.$location || {};
        var view = BaseView.newInstance(di, {
            presenter: StepTwoPresenter,
            model: StepTwoModel,
            view: StepTwoView
        });
        return view;
    };

    StepTwoView.prototype.show = BaseView.methods.show;
    StepTwoView.prototype.showError = function() {
        window.location.href = '/';
    };

    StepTwoView.prototype.initData = function(dto) {
        this.data.stepOne = dto.stepOne;
        this.data.masterAreaOfCover = dto.masterAreaOfCover;
        this.data.step = {persons: dto.persons};
        this.initCountries(dto.countries);
        this._makeSelectList();
    };

    StepTwoView.prototype._initFn = function() {
        this.fn.onKeyupCountriesSearch = this._onKeyupCountriesSearch.bind(this);
    };

    StepTwoView.prototype.initCountries = function(countries) {
        this.data.countries = countries;
    };

    StepTwoView.prototype._makeSelectList = function() {
        this.data.age = [];
        for (var i = 1; i <= 70; i++) {
            this.data.age.push(i);
        }
    };

    StepTwoView.prototype.saveSuccess = function() {
        this.$location.path('/step-3');
    };

    StepTwoView.prototype._onKeyupCountriesSearch = function($event) {
        if ($event.which === 40) {
            $($($event.target).parents('.list-countries').find('.list-group-item')[0]).trigger('focus');
        }
    };

    return StepTwoView;
});
