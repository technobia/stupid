define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function AskUsPresenter(di) {
        this.di = di;
    }

    AskUsPresenter.newInstance = function(di) {
        di = di || {};
        return new AskUsPresenter(di);
    };

    AskUsPresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
        view.event.onClickAskUs = creator.createEventHandler({modelMethod: 'askUs', viewSuccess: 'askUsSuccess', viewError: 'askUsFailure'});
        view.event.onOpenDetail = creator.createEventHandler({modelMethod: 'setDetail', viewSuccess: 'redirectToDetail'});
    };

    return AskUsPresenter;
});
