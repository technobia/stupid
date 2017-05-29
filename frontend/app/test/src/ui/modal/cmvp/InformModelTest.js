define(function(require) {
    'use strict';
	describe('ui/modal/cmvp/InformModel', function() {
		var InformModel = require('ui/modal/cmvp/InformModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut;
		beforeEach(function() {
            sut = InformModel.newInstance({Q: PromiseHelper.fake});
            sut.$rootScope = {};
		});

        describe('initModel', function() {
            it('should return dto', function() {
                expect(sut.initModel().getActualResult()).toEqual({});
            });
        });
	});
});
