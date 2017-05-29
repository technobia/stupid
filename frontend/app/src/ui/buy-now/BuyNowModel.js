define(function(require) {
    'use strict';

    var Q = require('q');
    var LocalStorage = require('cmvp/services/LocalStorage');
    var RestAPI = require('infra/RestAPI');
    var _ = require('lodash');

    function BuyNow(di) {
        this.di = di;
        this.localStorage = di.localStorage;
        this.restAPI = di.restAPI;
        this.$rootScope = di.$rootScope;
    }

    BuyNow.newInstance = function(di) {
        di.Q = di.Q || Q;
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        di.restAPI = di.restAPI || RestAPI.newInstance();
        di.$rootScope = di.$rootScope || {};
        return new BuyNow(di);
    };

    BuyNow.prototype.initModel = function() {
        this.planFilter = this._getPlanFilter();
        this.selection = this._getSelection();
        this.plan = this._getData();
        if (!!this.plan) {
            return this.plan;
        } else {
            throw new Error('Invalid plan');
        }
    };

    BuyNow.prototype._getData = function() {
        return this.localStorage.get('buy-now');
    };

    BuyNow.prototype._getPlanFilter = function() {
        return this.localStorage.get('planFilter');
    };

    BuyNow.prototype._getSelection = function() {
        return this.localStorage.get('selection');
    };

    BuyNow.prototype.apply = function(formData) {
        return this.restAPI.apply({
            planId: this.plan.plan_id,
            numberInsured: this.planFilter.numberInsured,
            countryOfResidence: _.find(this.selection.countries, {country_id: this.planFilter.countryOfResidence}).country_name,
            persons: this.planFilter.persons,
            userInfo: formData,
            refId: this._getRef()
        });
    };

    BuyNow.prototype._getRef = function() {
        var data = this.localStorage.get('ref');
        return data ? data.ref : '';
    };

    BuyNow.prototype.setDetail = function(plan) {
        return this.localStorage.set('details', [plan]);
    };

    return BuyNow;
});
