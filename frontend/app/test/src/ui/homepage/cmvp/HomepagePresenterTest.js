define(function(require) {
    'use strict';
	describe('ui/homepage/cmvp/HomepagePresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var HomepageView = require('ui/homepage/cmvp/HomepageView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(HomepageView);
            view = mvp.viewStub;
            model = mvp.modelStub;
            sut = mvp.presenter;
        });

        function getSut() { return sut; }
        function getModel() { return model; }
        function getView() { return view; }

		PresenterHelper.testShowSetsValidEvents(getSut, getView, getModel, ['onLoad']);
	});

});
