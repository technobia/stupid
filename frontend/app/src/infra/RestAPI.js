/**
 * Created by apiumdev on 30/10/2015.
 */
define(function(require) {
    'use strict';

    var AjaxService = require('cmvp/services/AjaxService');
    var Configuration = require('Configuration');

    function RestAPI(di) {
        this.di = di;
    }

    RestAPI.prototype.getAllCountry = function() {
        return this.di.ajaxService.ok('GET', 'json/countries.json');
    };

    RestAPI.prototype.getMasterArea = function() {
        return this.di.ajaxService.ok('GET', 'json/master_areas_of_cover.json');
    };

    RestAPI.prototype.getPlans = function() {
        return this.di.ajaxService.ok('GET', 'json/plans.json');
    };

    RestAPI.prototype.getPlanByPage = function(page) {
        return this.di.ajaxService.ok('GET', 'json/company-premiums-and-benefits-' + page + '.json');
    };

    RestAPI.prototype.getPlanCases = function(params) {
        return this.di.ajaxService.ok('GET', Configuration.api.planCases + '/' + params);
    };

    RestAPI.prototype.apply = function(params) {
        return this.di.ajaxService.ok('POST', Configuration.api.buyNow, params);
    };

    RestAPI.prototype.filterPlans = function(params) {
        return this.di.ajaxService.ok('POST', Configuration.api.planCases, params);
    };

    RestAPI.prototype.askUs = function(params) {
        return this.di.ajaxService.ok('POST', Configuration.api.askUs, params);
    };

    RestAPI.newInstance = function(di) {
        di = di || {};
        di.ajaxService = di.ajaxService || AjaxService.newInstance();
        return new RestAPI(di);
    };

    return RestAPI;
});
