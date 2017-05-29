define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function PlanPresenter(di) {
        this.di = di;
    }

    PlanPresenter.newInstance = function(di) {
        di = di || {};
        return new PlanPresenter(di);
    };

    PlanPresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData'});
        view.event.onChoosenCalendar = creator.createEventHandler({modelMethod: 'calculateAge', viewSuccess: 'setCalculateAge'});
        view.event.onChangeMainCover = creator.createEventHandler({modelMethod: 'getPerson', viewSuccess: 'updatePerson'});
        view.event.onAddMoreKid = creator.createEventHandler({modelMethod: 'addMoreKid', viewSuccess: 'updatePerson'});
        view.event.onRemoveKid = creator.createEventHandler({modelMethod: 'removeKid', viewSuccess: 'updatePerson'});
        view.event.onFindPlan = creator.createEventHandler({modelMethod: 'findPlan', viewSuccess: 'redirect'});
    };

    return PlanPresenter;
});
