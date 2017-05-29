define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function DetailPresenter(di) {
        this.di = di;
    }

    DetailPresenter.newInstance = function(di) {
        di = di || {};
        return new DetailPresenter(di);
    };

    DetailPresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
    };

    return DetailPresenter;
});
