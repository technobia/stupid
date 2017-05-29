define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
	var View = require('ui/step3/cmvp/StepThreeView');

	function StepThreeController($scope, $rootScope, $location) {
		BaseController.constructor(this, {
		    $scope: $scope,
			$rootScope: $rootScope,
			$location: $location
		}, View);
	}

	StepThreeController.$inject = ['$scope', '$rootScope', '$location'];
    return StepThreeController;
});
