define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function StepTwoPresenter(di) {
        this.di = di;
    }

    StepTwoPresenter.newInstance = function(di) {
        di = di || {};
        return new StepTwoPresenter(di);
    };

    StepTwoPresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
        view.event.onSave = creator.createEventHandler({modelMethod: 'save', viewSuccess: 'saveSuccess'});
        view.event.onFilterCountries = creator.createEventHandler({modelMethod: 'filterCountries', viewSuccess: 'initCountries'});
    };

    return StepTwoPresenter;
});
