define(function(require) {
    'use strict';
	describe('ui/plan/PlanModel', function() {
		var PlanModel = require('ui/plan/PlanModel');
		var PromiseHelper = require('test-helpers/Promise');

		var sut;
		beforeEach(function() {
            sut = PlanModel.newInstance({Q: PromiseHelper.fake});
            sut.planEntity = {};
            sut.di = {};
		});

		xdescribe('initModel', function() {
		    beforeEach(function() {
                sut.di.Q = jasmine.createSpy();
                sut.initModel();
            });

		    it('should call toDTO', function() {
		    	expect(sut.di.Q).toHaveBeenCalled();
			});
		});
	});
});
