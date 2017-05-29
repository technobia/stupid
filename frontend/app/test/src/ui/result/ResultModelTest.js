define(function(require) {
    'use strict';
	describe('ui/result/ResultModel', function() {
		var ResultModel = require('ui/result/ResultModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut;
		beforeEach(function() {
            sut = ResultModel.newInstance({Q: PromiseHelper.fake});
		});

        function mkInitialDTO() {
            return {};
        }

		xdescribe('initModel', function() {
            describe('always', function() {
                it('should return the initial dto', function() {
                    expect(sut.initModel().getActualResult()).toEqual(mkInitialDTO());
                });
            });
		});
	});
});
