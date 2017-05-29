define(function(require) {
    'use strict';
	describe('ui/buy-now/BuyNowPresenter', function() {
		var PresenterHelper = require('test-helpers/Presenter');
		var BuyNowView = require('ui/buy-now/BuyNowView');

        var sut, view, model;
        beforeEach(function() {
            var mvp = PresenterHelper.exerciseCreateMVP(BuyNowView);
            view = mvp.viewStub;
            model = mvp.modelStub;
            sut = mvp.presenter;
        });

        function getSut() { return sut; }
        function getModel() { return model; }
        function getView() { return view; }

		PresenterHelper.testShowSetsValidEvents(getSut, getView, getModel, ['onLoad', 'onClickApply', 'onOpenDetail']);
	});

});
