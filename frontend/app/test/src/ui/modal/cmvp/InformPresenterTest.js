define(function(require) {
    'use strict';
	describe('ui/modal/cmvp/InformPresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var InformView = require('ui/modal/cmvp/InformView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(InformView);
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
