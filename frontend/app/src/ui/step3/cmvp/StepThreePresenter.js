define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function StepThreePresenter(di) {
        this.di = di;
    }

    StepThreePresenter.newInstance = function(di) {
        di = di || {};
        return new StepThreePresenter(di);
    };

    StepThreePresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData', viewError: 'redirectToStepOne'});
        view.event.filterWithOptions = creator.createEventHandler({modelMethod: 'filterWithOptions', viewSuccess: 'initData'});
    };

    return StepThreePresenter;
});
