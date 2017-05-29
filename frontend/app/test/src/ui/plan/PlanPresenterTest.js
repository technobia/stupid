define(function(require) {
    'use strict';
	describe('ui/plan/PlanPresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var PlanView = require('ui/plan/PlanView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(PlanView);
            view = mvp.viewStub;
            model = mvp.modelStub;
            sut = mvp.presenter;
        });

        function getSut() { return sut; }
        function getModel() { return model; }
        function getView() { return view; }

		PresenterHelper.testShowSetsValidEvents(getSut, getView, getModel, [
		    'onLoad', 'onChoosenCalendar', 'onChangeMainCover', 'onAddMoreKid', 'onRemoveKid', 'onFindPlan'
        ]);
	});

});
