define(function(require) {
    'use strict';
    var StepThreePresenter = require('ui/step3/cmvp/StepThreePresenter');
    var StepThreeModel = require('ui/step3/cmvp/StepThreeModel');
    var BaseView = require('cmvp/views/BaseView');

    function StepThreeView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.$rootScope = di.$rootScope;
        this.$location = di.$location;
    }

    StepThreeView.newInstance = function(di) {
        di.$rootScope = di.$rootScope || {};
        di.$location = di.$location || {};
        var view = BaseView.newInstance(di, {
            presenter: StepThreePresenter,
            model: StepThreeModel,
            view: StepThreeView
        });
        return view;
    };

    StepThreeView.prototype.show = BaseView.methods.show;
    StepThreeView.prototype.showError = BaseView.methods.showError;

    StepThreeView.prototype.initData = function(dto) {
        this.data.plans = dto.plans;
        this.data.currentPage = dto.currentPage;
        this.data.masterAreaOfCover = dto.masterAreaOfCover;
        this.data.filter = dto.filter;
        this._initDefaultOptions();
        this._initDataExcess();
        this._initDataMaximumCover();
        this._initPagination(dto.totalPage);
    };

    StepThreeView.prototype._initFn = function() {
        this.fn.redirectTo = this._redirectTo.bind(this);
        this.fn.scrollTop = this._scrollTop.bind(this);
        this.fn.beforeFilter = this._beforeFilter.bind(this);
    };

    StepThreeView.prototype._initDefaultOptions = function() {
        this.data.options = [
            {key: 1, value: 'Required'},
            {key: 0, value: 'Not required'}
        ];

        this.data.excessList = [
            {key: 0, value: 'USD 0'},
            {key: 500, value: '< USD 500'},
            {key: 1000, value: '< USD 1,000'},
            {key: 2500, value: '< USD 2,500'},
            {key: 5000, value: '< USD 5,000'}
        ];

        this.data.maximumCoverList = [
            {key: 20000, value: '> USD 20,000'},
            {key: 40000, value: '> USD 40,000'},
            {key: 90000, value: '> USD 90,000'},
            {key: 190000, value: '> USD 190,000'},
            {key: 500000, value: '> USD 500,000'},
            {key: 1000000, value: '> USD 1,000,000'},
        ];
    };

    StepThreeView.prototype._initPagination = function(total) {
        this.data.totalPage = [];
        for (var i = 1; i <= total; i++) {
            this.data.totalPage.push(i);
        }
    };

    StepThreeView.prototype._initDataExcess = function() {
        this.data.excessList.forEach(function(e) {
            if (+this.data.filter.excess === e.key)
                this.data.excess = e;
        }.bind(this));
    };

    StepThreeView.prototype._initDataMaximumCover = function() {
        this.data.maximumCoverList.forEach(function(e) {
            if (+this.data.filter.maximumCover === e.key)
                this.data.maximumCover = e;
        }.bind(this));
    };

    StepThreeView.prototype._redirectTo = function(url, plan) {
        this.$rootScope.plan = plan;
        this.$location.path(url);
    };

    StepThreeView.prototype.redirectToStepOne = function() {
        this.$location.path('/step-1');
    };

    StepThreeView.prototype._scrollTop = function() {
        window.scrollTo(0, 0);
    };

    StepThreeView.prototype._beforeFilter = function() {
        this.data.filter.masterAreaOfCover = this.data.filter.masterAreaOfCoverObject.master_area_id;
        this.data.filter.nationality = this.data.filter.nationalityObject.country_id;
        this.data.filter.excess = this.data.excess.key;
        this.data.filter.maximumCover = this.data.maximumCover.key;
        this.event.filterWithOptions(this.data.filter);
    };

    return StepThreeView;
});
