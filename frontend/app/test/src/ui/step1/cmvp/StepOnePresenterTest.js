define(function(require) {
    'use strict';
	describe('ui/step1/cmvp/StepOnePresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var StepOneView = require('ui/step1/cmvp/StepOneView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(StepOneView);
            view = mvp.viewStub;
            model = mvp.modelStub;
            sut = mvp.presenter;
        });

        function getSut() { return sut; }
        function getModel() { return model; }
        function getView() { return view; }

		PresenterHelper.testShowSetsValidEvents(getSut, getView, getModel, ['onLoad', 'onSelectRequirement', 'onSave', 'onFilterCountries']);
	});

});
