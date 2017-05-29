define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
	var View = require('ui/buy-now/BuyNowView');

	function BuyNowController($scope, $rootScope, $uibModal, $location) {
		BaseController.constructor(this, {
		    $scope: $scope,
			$rootScope: $rootScope,
			$uibModal: $uibModal,
            $location: $location
		}, View);
	}

	BuyNowController.$inject = ['$scope', '$rootScope', '$uibModal', '$location'];
    return BuyNowController;
});
