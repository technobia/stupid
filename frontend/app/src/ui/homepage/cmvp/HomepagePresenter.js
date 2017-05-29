define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function HomepagePresenter(di) {
        this.di = di;
    }

    HomepagePresenter.newInstance = function(di) {
        di = di || {};
        return new HomepagePresenter(di);
    };

    HomepagePresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
    };

    return HomepagePresenter;
});
