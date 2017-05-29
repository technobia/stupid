define(function(require) {
    'use strict';
    var InformPresenter = require('ui/modal/cmvp/InformPresenter');
    var InformModel = require('ui/modal/cmvp/InformModel');
    var BaseView = require('cmvp/views/BaseView');

    function InformView(di) {
        BaseView.constructor(this, di);
        this._initFn();
        this.$uibModalInstance = di.$uibModalInstance;
        this.context = di.context;
    }

    InformView.newInstance = function(di) {
        di.$uibModalInstance = di.$uibModalInstance || {};
        di.context = di.context || {};
        var view = BaseView.newInstance(di, {
            presenter: InformPresenter,
            model: InformModel,
            view: InformView
        });
        return view;
    };

    InformView.prototype.show = BaseView.methods.show;
    InformView.prototype.showError = BaseView.methods.showError;

    InformView.prototype._initFn = function() {
        this.fn.close = this._close.bind(this);
    };

    InformView.prototype.initData = function(dto) {
        this.data.context = this.context;
    };

    InformView.prototype._close = function() {
        this.$uibModalInstance.close();
    };

    return InformView;
});
