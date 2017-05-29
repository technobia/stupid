define(function(require) {
    'use strict';
	describe('ui/step3/cmvp/StepThreePresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var StepThreeView = require('ui/step3/cmvp/StepThreeView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(StepThreeView);
            view = mvp.viewStub;
            model = mvp.modelStub;
            sut = mvp.presenter;
        });

        function getSut() { return sut; }
        function getModel() { return model; }
        function getView() { return view; }

		PresenterHelper.testShowSetsValidEvents(getSut, getView, getModel, ['onLoad', 'filterWithOptions']);
	});

});
