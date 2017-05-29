define(function(require) {
    'use strict';
	describe('ui/ask-us/AskUsPresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var AskUsView = require('ui/ask-us/AskUsView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(AskUsView);
            view = mvp.viewStub;
            model = mvp.modelStub;
            sut = mvp.presenter;
        });

        function getSut() { return sut; }
        function getModel() { return model; }
        function getView() { return view; }

		PresenterHelper.testShowSetsValidEvents(getSut, getView, getModel, ['onLoad', 'onClickAskUs', 'onOpenDetail']);
	});

});
