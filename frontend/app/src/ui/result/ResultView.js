define(function(require) {
    'use strict';
    var ResultPresenter = require('ui/result/ResultPresenter');
    var ResultModel = require('ui/result/ResultModel');
    var BaseView = require('cmvp/views/BaseView');
    var LocalStorage = require('cmvp/services/LocalStorage');

    function ResultView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.di = di;
        this.$rootScope = di.$rootScope;
        this.$location = di.$location;
        this.localStorage = di.localStorage;
    }

    ResultView.newInstance = function(di) {
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        return BaseView.newInstance(di, {
            presenter: ResultPresenter,
            model: ResultModel,
            view: ResultView
        });
    };

    ResultView.prototype.show = BaseView.methods.show;
    ResultView.prototype.showError = BaseView.methods.showError;

    ResultView.prototype.initData = function(dto) {
        this.initDTO(dto);
        this.data.sliderExcess = {
            value: this.data.filter.excess,
            options: {
                floor: 0,
                ceil: 5000,
                step: 500,
                showTicks: false,
                hideLimitLabels: true,
                hidePointerLabels: true,
                onChange: function() {
                    this.data.filter.excess = this.data.sliderExcess.value;
                    this.event.onFilter(this.data.filter);
                }.bind(this)
            }
        };
        this.data.sliderCover = {
            value: this.data.filter.maximumCover,
            options: {
                floor: 20000,
                ceil: 1000000,
                step: 10000,
                showTicks: false,
                hideLimitLabels: true,
                hidePointerLabels: true,
                onChange: function() {
                    this.data.filter.maximumCover = this.data.sliderCover.value;
                    this.event.onFilter(this.data.filter);
                }.bind(this)
            }
        };
    };

    ResultView.prototype.initDTO = function(dto) {
        this.data.plans = dto.plans;
        this.data.details = dto.details;
        this.data.filter = this._decorateFilter(dto.filter);
        this.data.selection = dto.selection;
    };

    ResultView.prototype._decorateFilter = function(filter) {
        if (typeof filter.dentalCover === 'string') filter.dentalCover = filter.dentalCover === '1';
        if (typeof filter.maternityCover === 'string') filter.maternityCover = filter.maternityCover === '1';
        if (typeof filter.opticalCover === 'string') filter.opticalCover = filter.opticalCover === '1';
        if (typeof filter.outpatientCover === 'string') filter.outpatientCover = filter.outpatientCover === '1';
        return filter;
    };

    ResultView.prototype._initFn = function() {
        this.fn.onOpenFilter = this.openFilterModal.bind(this);
        this.fn.onCloseFilterModal = this.closeFilterModal.bind(this);
        this.fn.gotoBuyNow = this._gotoBuyNow.bind(this);
        this.fn.getChecked = this.getChecked.bind(this);
        this.fn.isDetailPicked = this._isDetailPicked.bind(this);
        this.fn.pickDetail = this._pickDetail.bind(this);
    };
    //event.onAddDetail(plan)
    ResultView.prototype._pickDetail = function(flag, plan) {
        flag ? this.event.onAddDetail(plan) : this.event.onRemoveDetail(plan);
    };

    ResultView.prototype._isDetailPicked = function(plan) {
        var lsDetails = this.getDetail();
        lsDetails = lsDetails.filter(function(v) {
            return v.id === plan.id
        });
        return lsDetails.length === 1 ? 'is-pick' : '';
    };

    ResultView.prototype.openFilterModal = function() {
        this.modalInstance = this.di.$uibModal.open({
            templateUrl: 'templates/result/filter.modal.html',
            backdrop: 'static',
            scope: this.di.$scope,
            windowClass: 'filter-modal'
        });
    };

    ResultView.prototype.redirect = function() {
        this.di.$location.path('/');
    };

    ResultView.prototype.closeFilterModal = function() {
        this.modalInstance.dismiss();
    };

    ResultView.prototype._gotoBuyNow = function(plan) {
        if (plan) {
            this.localStorage.set('buy-now', plan);
        }
        this.$location.path('/buy-now');
    };

    ResultView.prototype.getChecked = function(isChecked) {
        return isChecked ? 'text-success fa-check' : 'text-danger fa-remove';
    };

    ResultView.prototype.getDetail = function() {
        return this.localStorage.get('details');
    };

    ResultView.prototype.initComparePopup = function() {
        this.data.details = this.getDetail();
    };

    ResultView.prototype.viewSuccess = function() {};

    return ResultView;
});
