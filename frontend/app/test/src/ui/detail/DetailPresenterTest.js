define(function(require) {
    'use strict';
	describe('DetailPresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var DetailView = require('ui/detail/DetailView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(DetailView);
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
