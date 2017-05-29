define(function(require) {
    'use strict';

    var Q = require('q');
    var LocalStorage = require('cmvp/services/LocalStorage');
    var RestAPI = require('infra/RestAPI');
    var _ = require('lodash');

    function Result(di) {
        this.di = di;
        this.Q = di.Q;
        this.localStorage = di.localStorage;
        this.restAPI = di.restAPI;
    }

    Result.newInstance = function(di) {
        di.Q = di.Q || Q;
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        di.restAPI = di.restAPI || RestAPI.newInstance();
        return new Result(di);
    };

    Result.prototype.initModel = function() {
        this.details = this.getDetail();
        this.selection = this.localStorage.get('selection');
        this._getPlanFilter();
        return this.restAPI.filterPlans(this.planFilter)
            .then(this._setData.bind(this))
            .then(this._toDTO.bind(this));
    };

    Result.prototype._getPlanFilter = function() {
        this.planFilter = this.localStorage.get('planFilter');
        this.planFilter.excess = +this.planFilter.excess;
        this.planFilter.maximumCover = +this.planFilter.maximumCover;
    };

    Result.prototype._checkNull = function(data) {
        return !!data ? data : '';
    };

    Result.prototype._makePlanItemFilter = function() {
        this.plans = this.plans.map(function(e) {
            if (e.outPatientCover.text === 'USD') e.outPatientCover.text = '';
            if (e.dentalCover.text === 'USD') e.dentalCover.text = '';
            if (e.maternityCover.text === 'USD') e.maternityCover.text = '';
            if (e.opticalCover.text === 'USD') e.opticalCover.text = '';
            return e;
        });
    };

    Result.prototype._setData = function(data) {
        this._decoratePlans(data.list);
        this._makePlanItemFilter();
        this._sortPlans();
    };

    Result.prototype._sortPlans = function() {
        this.plans = this.plans.sort(function(a, b) {
            var numA = +a.totalAnnualPremium.split('USD')[1];
            var numB = +b.totalAnnualPremium.split('USD')[1];
            return numA - numB;
        });
    };

    Result.prototype._decoratePlans = function(list) {
        this.plans = list.map(function(e) {
            return {
                id: e.plan_id,
                plan_id: e.plan_id,
                logo: e.logo_url,
                company: e.company_name,
                planName: e.plan_name,
                areaOfCover: e.area_of_cover,
                maximumCover: 'USD '
                + ' ' + e.maximum_cover.toLocaleString()
                + ' ' + e.maximum_cover_periodicity,
                excess: 'USD '
                + ' ' + e.excess.toLocaleString()
                + ' ' + e.excess_periodicity,
                outPatientCover: {
                    checked: e.outpatient_cover === 1,
                    text: ((e.outpatient_cover === 1 ? e.currency : '')
                    + ' ' + this._checkNull(e.outpatient_cover_maximum.toLocaleString())
                    + ' ' + this._checkNull(e.outpatient_cover_periodicity)).trim()
                },
                dentalCover: {
                    checked: e.dental_cover === 1,
                    text: ((e.dental_cover === 1 ? e.currency : '')
                    + ' ' + this._checkNull(e.dental_cover_maximum.toLocaleString())
                    + ' ' + this._checkNull(e.dental_cover_periodicity)).trim()
                },
                maternityCover: {
                    checked: e.maternity_cover === 1,
                    text: ((e.maternity_cover === 1 ? e.currency : '')
                    + ' ' + this._checkNull(e.maternity_cover_maximum.toLocaleString())
                    + ' ' + this._checkNull(e.maternity_cover_periodicity)).trim()
                },
                opticalCover: {
                    checked: e.optical_cover === 1,
                    text: ((e.optical_cover === 1 ? e.currency : '')
                    + ' ' + this._checkNull(e.optical_cover_maximum.toLocaleString())
                    + ' ' + this._checkNull(e.optical_cover_periodicity)).trim()
                },
                otherHighlights: e.other_highlights,
                askUs: [{
                    name: 'Benefits schedule',
                    url: '/upload/documents/' + e.benefits_schedule_pdf_url
                }, {
                    name: 'General conditions',
                    url: '/upload/documents/' + e.general_conditions_pdf_url
                }],
                totalAnnualPremium: 'USD ' + e.total_annual_premium,
                total_annual_premium: e.total_annual_premium
            };
        }.bind(this));
    };

    Result.prototype._beforeFilter = function(filter) {
        filter = _.cloneDeep(filter);
        filter.outpatientCover = '' + filter.outpatientCover;
        filter.dentalCover = '' + filter.dentalCover;
        filter.maternityCover = '' + filter.maternityCover;
        filter.opticalCover = '' + filter.opticalCover;
        return filter;
    };

    Result.prototype._decoratePersons = function(persons) {
        return persons.map(function(e) {
            e.nationality = e.nationality.country_name;
            return e;
        });
    };

    Result.prototype._getData = function() {
        this.data = this.localStorage.get('plan');
    };

    Result.prototype.filterPlan = function(filter) {
        filter = _.cloneDeep(filter);
        if (typeof filter.dentalCover === 'boolean') filter.dentalCover = filter.dentalCover ? '1' : 0;
        if (typeof filter.maternityCover === 'boolean') filter.maternityCover = filter.maternityCover ? '1' : 0;
        if (typeof filter.opticalCover === 'boolean') filter.opticalCover = filter.opticalCover ? '1' : 0;
        if (typeof filter.outpatientCover === 'boolean') filter.outpatientCover = filter.outpatientCover ? '1' : 0;

        if (this.di.$rootScope.isMobile) {
            this.filterData = filter;
            return this.Q(this._toDTO());
        } else {
            return this.doFilter(filter);
        }
    };

    Result.prototype.doFilter = function(filter) {
        this.localStorage.set('planFilter', filter);
        return this.initModel();
    };

    Result.prototype.doFilterForMobile = function() {
        if (this.filterData) {
            this.localStorage.set('planFilter', this.filterData);
            delete this.filterData;
        }
        return this.initModel();
    };

    Result.prototype.doCancelFilter = function() {
        this._getPlanFilter();
        return this.Q(this._toDTO());
    };

    Result.prototype.checkDetailExists = function(arr, candidate) {
        var duplicated = arr.filter(function(v) {
            return v.id === candidate.id
        });
        return duplicated.length === 0;
    };

    Result.prototype.setDetail = function(plan) {
        var lsDetails = this.getDetail();
        var details;
        if (!!lsDetails) {
            details = lsDetails;
            if (this.checkDetailExists(details, plan)) {
                details.push(plan);
            } else {
                // exists!!
                // throw error??
            }
        } else {
            details = [];
            details.push(plan);
        }

        return this.localStorage.set('details', details);
    };

    Result.prototype.removeDetail = function(plan) {
        var lsDetails = this.getDetail();
        if (!!lsDetails) {
            lsDetails = lsDetails.filter(function(v) {
                return v.id !== plan.id;
            });
        }

        return this.localStorage.set('details', lsDetails);
    };

    Result.prototype.removeAllDetail = function() {
        return this.localStorage.set('details', []);
    };

    Result.prototype.getDetail = function() {
        return this.localStorage.get('details');
    };

    Result.prototype._toDTO = function() {
        return {
            plans: this.plans,
            details: this.details,
            filter: this.planFilter,
            selection: this.selection
        };
    };

    return Result;
});
