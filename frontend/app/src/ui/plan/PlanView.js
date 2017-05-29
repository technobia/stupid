define(function(require) {
    'use strict';
    var PlanPresenter = require('ui/plan/PlanPresenter');
    var PlanModel = require('ui/plan/PlanModel');
    var BaseView = require('cmvp/views/BaseView');
    var _ = require('lodash');

    function PlanView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.di = di;
    }

    PlanView.newInstance = function(di) {
        var view = BaseView.newInstance(di, {
            presenter: PlanPresenter,
            model: PlanModel,
            view: PlanView
        });
        return view;
    };

    PlanView.prototype.show = BaseView.methods.show;
    PlanView.prototype.showError = BaseView.methods.showError;

    PlanView.prototype.initData = function(dto) {
        this.initDTO(dto);
        this.defaultPersonOfCover();
        this.selectFromCountry();
        this.selectResideCountry();
        this.selectArea();
    };

    PlanView.prototype.initDTO = function(dto) {
        this.data.plan = dto.plan;
        this.data.selection = dto.selection;
    };

    PlanView.prototype.updatePerson = function(persons) {
        this.data.plan.persons = persons;
    };

    PlanView.prototype.defaultPersonOfCover = function() {
        this.data.coverPersonSelected = 0;
        this.data.datepickerOptions = {
            datepickerMode: 'year',
            maxDate: new Date()
        };
    };

    PlanView.prototype._initFn = function() {
        this.fn.onSelectFromCountry = this.selectFromCountry.bind(this);
        this.fn.onSelectResideCountry = this.selectResideCountry.bind(this);
        this.fn.onSelectArea = this.selectArea.bind(this);
        this.fn.isShowSpouse = this.isShowSpouse.bind(this);
        this.fn.isShowKid = this.isShowKid.bind(this);
        this.fn.checkShowAddMoreKid = this.checkShowAddMoreKid.bind(this);
    };

    PlanView.prototype.checkShowAddMoreKid = function() {
        return _.filter(this.data.plan.persons, function(e) {
            return e.relationShip === 'child';
        }).length < 7;
    };

    PlanView.prototype.selectFromCountry = function() {
        this.data.fromCountryValue = _.find(this.data.selection.countries, {country_id: this.data.plan.nationality}).country_name;
    };

    PlanView.prototype.selectResideCountry = function() {
        this.data.resideCountryValue = _.find(this.data.selection.countries, {country_id: this.data.plan.countryOfResidence}).country_name;
    };

    PlanView.prototype.selectArea = function() {
        this.data.areaValue = _.find(this.data.selection.area, {master_area_id: this.data.plan.masterAreaOfCover}).master_area_name;
    };

    PlanView.prototype.setCalculateAge = function(newDate, index) {
        this.data.plan.persons[index].age = newDate;
    };

    PlanView.prototype.isShowSpouse = function() {
        return this.data.coverPersonSelected === 1 || this.data.coverPersonSelected === 2;
    };

    PlanView.prototype.isShowKid = function() {
        return this.data.coverPersonSelected === 2 || this.data.coverPersonSelected === 3;
    };

    PlanView.prototype.redirect = function() {
        this.di.$location.path('results');
    };

    return PlanView;
});
