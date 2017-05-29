define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
	var View = require('ui/ask-us/AskUsView');

	function AskUsController($scope, $rootScope, $uibModal, $location) {
		BaseController.constructor(this, {
		    $scope: $scope,
			$rootScope: $rootScope,
			$uibModal: $uibModal,
            $location: $location
		}, View);
	}

	AskUsController.$inject = ['$scope', '$rootScope', '$uibModal', '$location'];
    return AskUsController;
});
