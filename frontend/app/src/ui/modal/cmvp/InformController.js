define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
	var View = require('ui/modal/cmvp/InformView');

	function InformController($scope, $uibModalInstance, context) {
		BaseController.constructor(this, {
		    $scope: $scope,
			$uibModalInstance: $uibModalInstance,
			context: context
		}, View);
	}

	InformController.$inject = ['$scope', '$uibModalInstance', 'context'];
    return InformController;
});
