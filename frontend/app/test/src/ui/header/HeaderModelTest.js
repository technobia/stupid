define(function(require) {
    'use strict';
	describe('ui/header/HeaderModel', function() {
		var HeaderModel = require('ui/header/HeaderModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut;
		beforeEach(function() {
            sut = HeaderModel.newInstance({Q: PromiseHelper.fake});
		});

        function mkInitialDTO() {
            return {};
        }

		describe('initModel', function() {
            describe('always', function() {
                it('should return the initial dto', function() {
                    expect(sut.initModel().getActualResult()).toEqual(mkInitialDTO());
                });
            });
		});
	});
});
