define(function(require) {
    'use strict';
    var HomepagePresenter = require('ui/homepage/cmvp/HomepagePresenter');
    var HomepageModel = require('ui/homepage/cmvp/HomepageModel');
    var BaseView = require('cmvp/views/BaseView');

    function HomepageView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.di = di;
    }

    HomepageView.newInstance = function(di) {
        var view = BaseView.newInstance(di, {
            presenter: HomepagePresenter,
            model: HomepageModel,
            view: HomepageView
        });
        return view;
    };

    HomepageView.prototype.show = BaseView.methods.show;
    HomepageView.prototype.showError = BaseView.methods.showError;

    HomepageView.prototype.initData = function(dto) {
        this.data.dto = dto;
    };

    HomepageView.prototype._initFn = function() {
        this.fn.redirectToBlog = this.redirectToBlog.bind(this);
    };

    HomepageView.prototype.redirectToBlog = function() {
        this.di.$location.path('/blog');
    };

    return HomepageView;
});
