/**
 * Created by apium on 08/05/2017.
 */
define(function(require) {
    'use strict';

    var moment = require('moment');
    var LocalStorage = require('cmvp/services/LocalStorage');
    var Guid = require('ui/service/GuidService');

    function PlanEntity(di) {
        this.di = di;
        this.getPlan();
    }

    PlanEntity.newInstance = function(di) {
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        return {
            new: function() {
                return new PlanEntity(di);
            }
        };
    };

    PlanEntity.prototype.getPlan = function() {
        this.plan = this.di.localStorage.get('plan') || this._defaultPlan();
        this.plan = this._decoratePlan(this.plan);
    };

    PlanEntity.prototype._decoratePlan = function(plan) {
        plan.outpatientCover = typeof plan.outpatientCover === 'string' && plan.outpatientCover === '1';
        plan.dentalCover = typeof plan.dentalCover === 'string' && plan.dentalCover === '1';
        plan.maternityCover = typeof plan.maternityCover === 'string' && plan.maternityCover === '1';
        plan.opticalCover = typeof plan.opticalCover === 'string' && plan.opticalCover === '1';
        return plan;
    };

    PlanEntity.prototype._defaultPlan = function() {
        return {
            masterAreaOfCover: '1',
            countryOfResidence: 245,
            nationality: 79,
            numberInsured: 0,
            outpatientCover: false,
            dentalCover: false,
            maternityCover: false,
            opticalCover: false,
            persons: [this._defaultMainPerson()]
        };
    };

    PlanEntity.prototype._defaultMainPerson = function() {
        var defaultMainPersonAge = moment().subtract(30, 'year');
        return {
            id: Guid(),
            rawData: {
                age: defaultMainPersonAge,
                gender: 0,
                masterAreaOfCover: '1',
                nationality: 79
            },
            age: this.calculateAge(defaultMainPersonAge),
            gender: 'male',
            masterAreaOfCover: 'Worldwide',
            nationality: 'France'
        };
    };

    PlanEntity.prototype.defaultSpouse = function(gender) {
        var defaultMainPersonAge = moment().subtract(30, 'year');
        return {
            id: Guid(),
            rawData: { age: defaultMainPersonAge },
            age: this.calculateAge(defaultMainPersonAge),
            gender: gender === 0 ? 'female' : 'male',
            relationShip: 'spouse'
        };
    };

    PlanEntity.prototype.defaultKid = function() {
        var defaultMainPersonAge = moment().subtract(3, 'year');
        return {
            id: Guid(),
            rawData: {
                age: defaultMainPersonAge,
                gender: 0
            },
            age: this.calculateAge(defaultMainPersonAge),
            gender: 'boy',
            relationShip: 'child'
        };
    };

    PlanEntity.prototype.calculateAge = function(date) {
        return moment().diff(moment(date), 'year');
    };

    PlanEntity.prototype.toDTO = function() {
        return this.plan;
    };

    return PlanEntity;
});
