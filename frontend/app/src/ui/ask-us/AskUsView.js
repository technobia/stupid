define(function(require) {
    'use strict';
    var AskUsPresenter = require('ui/ask-us/AskUsPresenter');
    var AskUsModel = require('ui/ask-us/AskUsModel');
    var BaseView = require('cmvp/views/BaseView');

    function AskUsView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.di = di;
        this.$uibModal = di.$uibModal;
        this.$location = di.$location;
    }

    AskUsView.newInstance = function(di) {
        di.$uibModal = di.$uibModal || {};
        return BaseView.newInstance(di, {
            presenter: AskUsPresenter,
            model: AskUsModel,
            view: AskUsView
        });
    };

    AskUsView.prototype.show = BaseView.methods.show;

    AskUsView.prototype.showError = function() {
        this._redirectTo('/home');
    };

    AskUsView.prototype.initData = function(plan) {
        this.data.plan = plan;
    };

    AskUsView.prototype._initFn = function() {
        this.fn.redirectTo = this._redirectTo.bind(this);
        this.fn.getChecked = this.getChecked.bind(this);
    };

    AskUsView.prototype._redirectTo = function(url) {
        this.$location.path(url);
    };

    AskUsView.prototype.getChecked = function(isChecked) {
        return isChecked ? 'text-success fa-check' : 'text-danger fa-remove';
    };

    AskUsView.prototype.redirectToDetail = function() {
        this.$location.path('/details');
    };

    AskUsView.prototype.askUsSuccess = function() {
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

    AskUsView.prototype.askUsFailure = function() {
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

    return AskUsView;
});
