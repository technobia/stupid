define(function(require) {
    'use strict';
    var DetailPresenter = require('ui/detail/DetailPresenter');
    var DetailModel = require('ui/detail/DetailModel');
    var BaseView = require('cmvp/views/BaseView');
    var LocalStorage = require('cmvp/services/LocalStorage');


    function DetailView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.$rootScope = di.$rootScope;
        this.$location = di.$location;
        this.localStorage = di.localStorage || LocalStorage.newInstance();
    }

    DetailView.newInstance = function(di) {
        return BaseView.newInstance(di, {
            presenter: DetailPresenter,
            model: DetailModel,
            view: DetailView
        });
    };

    DetailView.prototype.show = BaseView.methods.show;
    DetailView.prototype.showError = BaseView.methods.showError;

    DetailView.prototype.initData = function(details) {
        this.data.details = details;
        this.data.length = this.$rootScope.isMobile ? [0,1] : [0,1,2];
    };

    DetailView.prototype._initFn = function() {
        this.fn.getChecked = this.getChecked.bind(this);
        this.fn.gotoAskUs = this._gotoAskUs.bind(this);
        this.fn.gotoBuyNow = this._gotoBuyNow.bind(this);
    };

    DetailView.prototype.getChecked = function(isChecked) {
        return isChecked ? 'text-success fa-check' : 'text-danger fa-remove';
    };

    DetailView.prototype._gotoAskUs = function(plan) {
        if (plan) {
            this.localStorage.set('ask-us', plan);
        }
        this.$location.path('/ask-us');
    };

    DetailView.prototype._gotoBuyNow = function(plan) {
        if (plan) {
            this.localStorage.set('buy-now', plan);
        }
        this.$location.path('/buy-now');
    };

    return DetailView;
});
