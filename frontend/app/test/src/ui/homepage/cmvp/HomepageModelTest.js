define(function(require) {
    'use strict';
	describe('ui/homepage/cmvp/HomepageModel', function() {
		var HomepageModel = require('ui/homepage/cmvp/HomepageModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut;
		beforeEach(function() {
            sut = HomepageModel.newInstance({Q: PromiseHelper.fake});
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
