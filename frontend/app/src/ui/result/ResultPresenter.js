define(function(require) {
    'use strict';
    var PresenterHandlerCreator = require('cmvp/services/PresenterHandlerCreator');

    function ResultPresenter(di) {
        this.di = di;
    }

    ResultPresenter.newInstance = function(di) {
        di = di || {};
        return new ResultPresenter(di);
    };

    ResultPresenter.prototype.show = function(view, model) {
        var creator = new PresenterHandlerCreator(this, view, model);
        view.event.onLoad = creator.createEventHandler({modelMethod: 'initModel', viewSuccess: 'initData', viewError: 'redirect'});
        view.event.onFilter = this.handleOnFilter.bind(this, view, model);
        view.event.onFilterForMobile = creator.createEventHandler({modelMethod: 'doFilterForMobile', viewSuccess: 'initData'});
        view.event.onCancelFilter = creator.createEventHandler({modelMethod: 'doCancelFilter', viewSuccess: 'initData'});
        view.event.onAddDetail = creator.createEventHandler({modelMethod: 'setDetail', viewSuccess: 'initComparePopup'});
        view.event.onRemoveDetail = creator.createEventHandler({modelMethod: 'removeDetail', viewSuccess: 'initComparePopup'});
        view.event.onRemoveAllDetail = creator.createEventHandler({modelMethod: 'removeAllDetail', viewSuccess: 'initComparePopup'});
    };

    ResultPresenter.prototype.handleOnFilter = function(view, model, filter) {
        if (this.doFilter) {
            this.di.$timeout.cancel(this.doFilter);
        }

        this.doFilter = this.di.$timeout(function() {
            model.filterPlan(filter)
                .then(view.initData.bind(view))
                .catch(view.showError.bind(view));
        }, 500);
    };

    return ResultPresenter;
});
