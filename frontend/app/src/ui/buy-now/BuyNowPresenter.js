define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function BuyNowPresenter(di) {
        this.di = di;
    }

    BuyNowPresenter.newInstance = function(di) {
        di = di || {};
        return new BuyNowPresenter(di);
    };

    BuyNowPresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
        view.event.onClickApply = creator.createEventHandler({modelMethod: 'apply', viewSuccess: 'applySuccess', viewError: 'applyFailure'});
        view.event.onOpenDetail = creator.createEventHandler({modelMethod: 'setDetail', viewSuccess: 'redirectToDetail'});
    };

    return BuyNowPresenter;
});
