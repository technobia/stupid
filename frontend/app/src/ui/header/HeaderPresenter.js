define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function HeaderPresenter(di) {
        this.di = di;
    }

    HeaderPresenter.newInstance = function(di) {
        di = di || {};
        return new HeaderPresenter(di);
    };

    HeaderPresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
    };

    return HeaderPresenter;
});
