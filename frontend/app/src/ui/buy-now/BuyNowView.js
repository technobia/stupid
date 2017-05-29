define(function(require) {
    'use strict';
    var BuyNowPresenter = require('ui/buy-now/BuyNowPresenter');
    var BuyNowModel = require('ui/buy-now/BuyNowModel');
    var BaseView = require('cmvp/views/BaseView');

    function BuyNowView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.$uibModal = di.$uibModal;
        this.di = di;
        this.$location = di.$location;
    }

    BuyNowView.newInstance = function(di) {
        di.$uibModal = di.$uibModal || {};
        return BaseView.newInstance(di, {
            presenter: BuyNowPresenter,
            model: BuyNowModel,
            view: BuyNowView
        });
    };

    BuyNowView.prototype.show = BaseView.methods.show;
    BuyNowView.prototype.showError = function() {
        this._redirectTo('/home');
    };

    BuyNowView.prototype.initData = function(plan) {
        this.data.plan = plan;
    };

    BuyNowView.prototype._initFn = function() {
        this.fn.redirectTo = this._redirectTo.bind(this);
        this.fn.getChecked = this.getChecked.bind(this);
    };

    BuyNowView.prototype._redirectTo = function(url) {
        window.location.href = url;
    };

    BuyNowView.prototype.getChecked = function(isChecked) {
        return isChecked ? 'text-success fa-check' : 'text-danger fa-remove';
    };

    BuyNowView.prototype.applySuccess = function() {
        this.$uibModal.open({
            templateUrl: 'src/ui/modal/templates/inform-modal.html',
            controller: 'InformController',
            resolve: {
                context: {
                    header: 'Well received!',
                    msg: 'Check your email inbox, our customer relationship management team will get in touch as soon as possible! Please feel free to contact hello@ehealthscanner.com for any questions!'
                }
            }
        }).closed.then(this.showError.bind(this));
    };

    BuyNowView.prototype.applyFailure = function() {
        this.$uibModal.open({
            templateUrl: 'src/ui/modal/templates/inform-modal.html',
            controller: 'InformController',
            resolve: {
                context: {
                    header: 'An error has occurred.',
                    msg: 'Please send us a message through the live chat or write to us at hello@ehealthscanner.com so we can send you this plan\'s information and application procedure.'
                }
            }
        }).closed.then(this.showError.bind(this));
    };

    BuyNowView.prototype.redirectToDetail = function() {
        this.$location.path('/details');
    };

    return BuyNowView;
});
