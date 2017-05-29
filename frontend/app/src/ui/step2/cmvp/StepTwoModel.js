define(function(require) {
    'use strict';

    var Q = require('q');
    var LocalStorage = require('cmvp/services/LocalStorage');
    var RestAPI = require('infra/RestAPI');
    var Guid = require('ui/service/GuidService');

    function StepTwo(di) {
        this.Q = di.Q;
        this.localStorage = di.localStorage;
        this.restAPI = di.restAPI;
    }

    StepTwo.newInstance = function(di) {
        di.Q = di.Q || Q;
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        di.restAPI = di.restAPI || RestAPI.newInstance();
        return new StepTwo(di);
    };

    StepTwo.prototype.initModel = function() {
        this._setData(this._getData());

        return this.Q.all([
            this.restAPI.getAllCountry(),
            this.restAPI.getMasterArea()
        ])
            .then(function(array) {
                this._setCountries(array[0]);
                this._setArea(array[1]);
            }.bind(this))
            .then(this._toDTO.bind(this));
    };

    StepTwo.prototype._getData = function() {
        return this.localStorage.get('data');
    };

    StepTwo.prototype._setData = function(data) {
        this.stepOne = data.stepOne || {};
        this.stepTwo = data.stepTwo || {};
        this.filter = data.filter || {};
        this._makePersonList(this.stepOne.numberInsured);
    };

    StepTwo.prototype._makePersonList = function(numberInsured) {
        var persons = this.stepTwo.persons;
        this.persons = persons && persons.length === this.stepOne.numberInsured ? persons : [];

        if (!this.persons.length) {
            for (var i = 1; i <= numberInsured; i++) {
                this.persons.push({
                    id: Guid(),
                    age: '',
                    gender: '',
                    nationality: '',
                    relationShip: '',
                    masterAreaOfCover: ''
                });
            }
        }
    };

    StepTwo.prototype._setArea = function(masterAreaOfCover) {
        this.masterAreaOfCover = masterAreaOfCover;
    };

    StepTwo.prototype._setCountries = function(countries) {
        this.countries = countries;
    };

    StepTwo.prototype._toDTO = function() {
        return {
            stepOne: this.stepOne,
            countries: this.countries || [],
            masterAreaOfCover: this.masterAreaOfCover || [],
            persons: this.persons
        };
    };

    StepTwo.prototype.save = function(stepTwo) {
        return this.localStorage.set('data', {
            stepOne: this.stepOne,
            stepTwo: stepTwo
        });
    };

    StepTwo.prototype.filterCountries = function(keyword) {
        if (!keyword) return this.countries;
        var result = [];
        this.countries.forEach(function(e) {
            if (e.country_name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) result.push(e);
        });
        return result;
    };

    return StepTwo;
});
