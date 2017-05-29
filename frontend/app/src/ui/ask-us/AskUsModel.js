define(function(require) {
    'use strict';

    var Q = require('q');
    var LocalStorage = require('cmvp/services/LocalStorage');
    var RestAPI = require('infra/RestAPI');
    var _ = require('lodash');

    function AskUs(di) {
        this.di = di;
        this.localStorage = di.localStorage;
        this.restAPI = di.restAPI;
        this.$rootScope = di.$rootScope;
    }

    AskUs.newInstance = function(di) {
        di.Q = di.Q || Q;
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        di.restAPI = di.restAPI || RestAPI.newInstance();
        di.$rootScope = di.$rootScope || {};
        return new AskUs(di);
    };

    AskUs.prototype.initModel = function() {
        this.planFilter = this._getPlanFilter();
        this.selection = this._getSelection();
        this.plan = this._getData();

        if (!!this.plan) {
            return this.plan;
        } else {
            throw new Error('Invalid plan');
        }
    };

    AskUs.prototype._getData = function() {
        return this.localStorage.get('ask-us');
    };

    AskUs.prototype._getPlanFilter = function() {
        return this.localStorage.get('planFilter');
    };

    AskUs.prototype._getSelection = function() {
        return this.localStorage.get('selection');
    };

    AskUs.prototype.setDetail = function(plan) {
        return this.localStorage.set('details', [plan]);
    };

    AskUs.prototype.askUs = function(formData) {
        return this.restAPI.askUs({
            planId: this.plan.plan_id,
            numberInsured: this.planFilter.numberInsured,
            countryOfResidence: _.find(this.selection.countries, {country_id: this.planFilter.countryOfResidence}).country_name,
            persons: this.planFilter.persons,
            userInfo: formData,
            refId: this._getRef()
        });
    };

    AskUs.prototype._getRef = function() {
        var data = this.localStorage.get('ref');
        return data ? data.ref : '';
    };

    return AskUs;
});
