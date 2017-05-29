define(function(require) {
    'use strict';

    var Q = require('q');
    var LocalStorage = require('cmvp/services/LocalStorage');
    var RestAPI = require('infra/RestAPI');
    var _ = require('lodash');
    var PlanEntity = require('domain/PlanEntity');

    function Plan(di) {
        this.di = di;
        this.localStorage = di.localStorage;
        this.restAPI = di.restAPI;
        this.planEntity = di.planEntity;
    }

    Plan.newInstance = function(di) {
        di.Q = di.Q || Q;
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        di.restAPI = di.restAPI || RestAPI.newInstance();
        di.planEntity = di.planEntity || PlanEntity.newInstance(di);
        return new Plan(di);
    };

    Plan.prototype.initModel = function() {
        return this.di.Q(this._getDefaultSelection())
            .then(this._newPlanEntity.bind(this))
            .then(this.toDTO.bind(this));
    };

    Plan.prototype._newPlanEntity = function() {
        this.plan = this.planEntity.new();
    };

    Plan.prototype.calculateAge = function(date) {
        return this.plan.calculateAge(date);
    };

    Plan.prototype._getDefaultSelection = function() {
        if (this.getSelection()) {
            return this.saveSelection(this.getSelection());
        }

        return this.di.Q.all([
            this.restAPI.getAllCountry(),
            this.restAPI.getMasterArea()
        ]).then(function(resp) {
            this.countries = resp[0];
            this.areaSelection = resp[1];
            this.coverPersonSelection = [
                {value: 0, name: 'me'},
                {value: 1, name: 'me and my spouse'},
                {value: 2, name: 'me, my spouse and kids'},
                {value: 3, name: 'me and my kids'}
            ];
            this.mainGender = [
                {value: 0, name: 'male'},
                {value: 1, name: 'female'}
            ];
            this.kidGender = [
                {value: 0, name: 'boy'},
                {value: 1, name: 'girl'}
            ];
        }.bind(this)).then(this.saveSelection.bind(this));
    };

    Plan.prototype.saveSelection = function(selection) {
        this.selection = selection || {
            cover: this.coverPersonSelection,
            mainGender: this.mainGender,
            kidGender: this.kidGender,
            countries: this.countries,
            area: this.areaSelection
        };
        this.localStorage.set('selection', this.selection);
    };

    Plan.prototype.getSelection = function() {
        return this.localStorage.get('selection');
    };

    Plan.prototype.getPerson = function(persons, mainCoverIndex) {
        if (mainCoverIndex === 0) {
            persons = this.removeSpouse(persons);
            persons = this.removeAllKids(persons);
        }
        if (mainCoverIndex === 1) {
            if (this.checkSpouseExits(persons)) this.addSpouse(persons);
            persons = this.removeAllKids(persons);
        }
        if (mainCoverIndex === 2) {
            if (this.checkSpouseExits(persons)) this.addSpouse(persons);
            if (this.checkKidExits(persons)) this.addKid(persons);
        }
        if (mainCoverIndex === 3) {
            persons = this.removeSpouse(persons);
            if (this.checkKidExits(persons)) this.addKid(persons);
        }
        return persons;
    };

    Plan.prototype.addSpouse = function(persons) {
        persons.splice(1, 0, this.plan.defaultSpouse(persons[0].rawData.gender));
    };

    Plan.prototype.removeSpouse = function(persons) {
        if (_.findIndex(persons, {relationShip: 'spouse'}) > -1) {
            persons.splice(_.findIndex(persons, {relationShip: 'spouse'}), 1);
        }
        return persons;
    };

    Plan.prototype.checkSpouseExits = function(persons) {
        return typeof _.find(persons, {relationShip: 'spouse'}) === 'undefined';
    };

    Plan.prototype.checkKidExits = function(persons) {
        return typeof _.find(persons, {relationShip: 'child'}) === 'undefined';
    };

    Plan.prototype.removeAllKids = function(persons) {
        return persons.filter(function(e) {
            return !e.relationShip || e.relationShip && e.relationShip !== 'child';
        });
    };

    Plan.prototype.addKid = function(persons) {
        persons.push(this.plan.defaultKid());
    };

    Plan.prototype.addMoreKid = function(persons) {
        this.addKid(persons);
        return persons;
    };

    Plan.prototype.removeKid = function(persons, index) {
        persons.splice(index, 1);
        return persons;
    };

    Plan.prototype.findPlan = function(data) {
        var requestData = {
            countryOfResidence: data.countryOfResidence,
            dentalCover: data.dentalCover ? '1' : '0',
            excess: '500',
            masterAreaOfCover: data.masterAreaOfCover,
            maternityCover: data.maternityCover ? '1' : '0',
            maximumCover: '90000',
            nationality: data.nationality,
            numberInsured: data.persons.length,
            opticalCover: data.opticalCover ? '1' : '0',
            outpatientCover: data.outpatientCover ? '1' : '0',
            page: 1,
            persons: data.persons
        };
        this.localStorage.set('planFilter', requestData);
    };

    Plan.prototype.toDTO = function() {
        return {
            selection: this.selection,
            plan: this.plan.toDTO()
        };
    };

    return Plan;
});
