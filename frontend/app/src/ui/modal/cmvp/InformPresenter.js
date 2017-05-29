define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function InformPresenter(di) {
        this.di = di;
    }

    InformPresenter.newInstance = function(di) {
        di = di || {};
        return new InformPresenter(di);
    };

    InformPresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
    };

    return InformPresenter;
});
