define(function(require) {
    'use strict';
	describe('ui/header/HeaderPresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var HeaderView = require('ui/header/HeaderView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(HeaderView);
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
