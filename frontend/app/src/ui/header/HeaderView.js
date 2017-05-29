define(function(require) {
    'use strict';
    var HeaderPresenter = require('ui/header/HeaderPresenter');
    var HeaderModel = require('ui/header/HeaderModel');
    var BaseView = require('cmvp/views/BaseView');
    var intro = require('intro');

    function HeaderView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.di = di;
    }

    HeaderView.newInstance = function(di) {
        var view = BaseView.newInstance(di, {
            presenter: HeaderPresenter,
            model: HeaderModel,
            view: HeaderView
        });
        return view;
    };

    HeaderView.prototype.show = BaseView.methods.show;
    HeaderView.prototype.showError = BaseView.methods.showError;

    HeaderView.prototype.initData = function(dto) {
        this.data.dto = dto;
    };

    HeaderView.prototype._initFn = function() {
        this.fn.onClickBackButton = this.clickBackButton.bind(this);
        this.fn.onOpenIntro = this.openIntro.bind(this);
    };

    HeaderView.prototype.clickBackButton = function() {
        switch (this.di.$rootScope.path) {
            case '/results':
                this.di.$location.path('/home');
                break;
            case '/details':
                this.di.$location.path('/results');
                break;
            case '/buy-now':
                this.di.$location.path('/results');
                break;
            case '/ask-us':
                this.di.$location.path('/results');
                break;
            case '/terms-of-use-legal-notice':
                this.di.$location.path('/home');
                break;
        }
    };

    HeaderView.prototype.openIntro = function() {
        intro().start();
    };

    return HeaderView;
});
