define(function(require) {
    'use strict';
	describe('ui/result/ResultPresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var ResultView = require('ui/result/ResultView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(ResultView);
            view = mvp.viewStub;
            model = mvp.modelStub;
            sut = mvp.presenter;
        });

        function getSut() { return sut; }
        function getModel() { return model; }
        function getView() { return view; }

		PresenterHelper.testShowSetsValidEvents(getSut, getView, getModel, [
		    'onLoad', 'onFilter', 'onFilterForMobile', 'onCancelFilter', 'onOpenDetail'
        ]);
	});

});
