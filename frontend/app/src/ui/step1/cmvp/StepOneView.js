define(function(require) {
    'use strict';
    var StepOnePresenter = require('ui/step1/cmvp/StepOnePresenter');
    var StepOneModel = require('ui/step1/cmvp/StepOneModel');
    var BaseView = require('cmvp/views/BaseView');
    var Configuration =  require('Configuration');

    function StepOneView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.$location = di.$location;
    }

    StepOneView.newInstance = function(di) {
        di.$location = di.$location || {};
        var view = BaseView.newInstance(di, {
            presenter: StepOnePresenter,
            model: StepOneModel,
            view: StepOneView
        });
        return view;
    };

    StepOneView.prototype.show = BaseView.methods.show;
    StepOneView.prototype.showError = BaseView.methods.showError;

    StepOneView.prototype.initData = function(dto) {
        this.allowMultiple = Configuration.allowMultiple;
        this.data.requirementList = dto.requirementList;
        this.data.step = {
            numberInsured: this.allowMultiple ? dto.numberInsured : 1,
            requirement: dto.requirement,
            countryOfResidence: dto.countryOfResidence
        };
        this.initCountries(dto.countries);
        this._initNumberInsured();
        this._initRequirement(dto.requirement);
    };

    StepOneView.prototype.initCountries = function(countries) {
        this.data.countries = countries;
    };

    StepOneView.prototype._initFn = function() {
        this.fn.checkExistRequirement = this._isExitRequirement.bind(this);
        this.fn.onKeyupCountriesSearch = this._onKeyupCountriesSearch.bind(this);
    };

    StepOneView.prototype._initNumberInsured = function() {
        this.data.numberInsured = [];
        var maxInsured = this.allowMultiple ? 7 : 1;
        for (var i = 1; i <= maxInsured; i ++) {
            this.data.numberInsured.push(i);
        }
    };

    StepOneView.prototype._initRequirement = function(requirement) {
        if (!Array.isArray(requirement)) return;

        this.data.requirementField = 'Hospital cover';
        requirement.forEach(function(e) {
            this.data.requirementField = this.data.requirementField + ', ' + e;
        }.bind(this));
    };

    StepOneView.prototype.initRequirementList = function(requirement) {
        this._initRequirement(requirement);
    };

    StepOneView.prototype._isExitRequirement = function(requirement) {
        return this.data.step.requirement.indexOf(requirement) > -1;
    };

    StepOneView.prototype.saveSuccess = function() {
        this.$location.path('/step-2');
    };

    StepOneView.prototype._onKeyupCountriesSearch = function($event) {
        if ($event.which === 40) {
            $($($event.target).parents('.list-countries').find('.list-group-item')[0]).trigger('focus');
        }
    };

    return StepOneView;
});
