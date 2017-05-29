define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function StepOnePresenter(di) {
        this.di = di;
    }

    StepOnePresenter.newInstance = function(di) {
        di = di || {};
        return new StepOnePresenter(di);
    };

    StepOnePresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
        view.event.onSelectRequirement = creator.createEventHandler({modelMethod: 'makeSelect', viewSuccess: 'initRequirementList'});
        view.event.onSave = creator.createEventHandler({modelMethod: 'save', viewSuccess: 'saveSuccess'});
        view.event.onFilterCountries = creator.createEventHandler({modelMethod: 'filterCountries', viewSuccess: 'initCountries'});
    };

    return StepOnePresenter;
});
