define(function(require) {
    'use strict';

    var Q = require('q');
    var LocalStorage = require('cmvp/services/LocalStorage');
    var RestAPI = require('infra/RestAPI');

    function StepOne(di) {
        this.localStorage = di.localStorage;
        this.restAPI = di.restAPI;
        this.requirementList = ['Outpatient cover', 'Dental cover', 'Optical cover', 'Maternity cover'];
    }

    StepOne.newInstance = function(di) {
        di.Q = di.Q || Q;
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        di.restAPI = di.restAPI || RestAPI.newInstance();
        return new StepOne(di);
    };

    StepOne.prototype.initModel = function() {
        this._setData(this._getData());

        return this.restAPI.getAllCountry()
            .then(this._setCountries.bind(this))
            .then(this._toDTO.bind(this));
    };

    StepOne.prototype._getData = function() {
        var data = this.localStorage.get('data');
        return data && data.stepOne ? data.stepOne : {};
    };

    StepOne.prototype._setCountries = function(countries) {
        this.countries = countries;
    };

    StepOne.prototype._setData = function(data) {
        function check(data, key) {
            return data && data[key];
        }
        if (check(data, 'numberInsured')) this.numberInsured = data.numberInsured;
        this.requirement = check(data, 'requirement') ? data.requirement : [];
        this.countryOfResidence = check(data, 'countryOfResidence') ? data.countryOfResidence : '';
    };

    StepOne.prototype._toDTO = function() {
        return {
            countryOfResidence: this.countryOfResidence,
            numberInsured: this.numberInsured,
            requirement: this.requirement,
            countries: this.countries,
            requirementList: this.requirementList
        };
    };

    StepOne.prototype.makeSelect = function(item) {
        if (this.requirement.indexOf(item) > -1) {
            var index = this.requirement.indexOf(item);
            this.requirement.splice(index, 1);
        } else {
            this.requirement.push(item);
        }

        return this.requirement;
    };

    StepOne.prototype.save = function(data) {
        return this.localStorage.set('data', {stepOne: data});
    };

    StepOne.prototype.filterCountries = function(keyword) {
        if (!keyword) return this.countries;
		var result = [];
        this.countries.forEach(function(e) {
            if (e.country_name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) result.push(e);
        });
		return result;
    };

    return StepOne;
});
