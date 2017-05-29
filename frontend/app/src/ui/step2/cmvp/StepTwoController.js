define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
	var View = require('ui/step2/cmvp/StepTwoView');

	function StepTwoController($scope, $location) {
		BaseController.constructor(this, {
		    $scope: $scope,
			$location: $location
		}, View);
	}

	StepTwoController.$inject = ['$scope', '$location'];
    return StepTwoController;
});
