define(function(require) {
    'use strict';
	describe('DetailModel', function() {
		var DetailModel = require('ui/detail/DetailModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut;
		beforeEach(function() {
            sut = DetailModel.newInstance({Q: PromiseHelper.fake});
		});

		xdescribe('initModel', function() {
            describe('always', function() {
                it('should return the initial dto', function() {
                    expect(sut.initModel().getActualResult()).toEqual({});
                });
            });
		});
	});
});
