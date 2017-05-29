define(function(require) {
    'use strict';
	describe('ui/step2/cmvp/StepTwoPresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var StepTwoView = require('ui/step2/cmvp/StepTwoView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(StepTwoView);
            view = mvp.viewStub;
            model = mvp.modelStub;
            sut = mvp.presenter;
        });

        function getSut() { return sut; }
        function getModel() { return model; }
        function getView() { return view; }

		PresenterHelper.testShowSetsValidEvents(getSut, getView, getModel, ['onLoad', 'onSave', 'onFilterCountries']);
	});

});
