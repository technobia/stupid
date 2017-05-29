define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
    var View = require('ui/result/ResultView');

    function ResultController($scope, $rootScope, $uibModal, $location, $timeout) {
        BaseController.constructor(this, {
            $scope: $scope,
            $rootScope: $rootScope,
            $uibModal: $uibModal,
            $location: $location,
            $timeout: $timeout
        }, View);
    }

    ResultController.$inject = ['$scope', '$rootScope', '$uibModal', '$location', '$timeout'];
    return ResultController;
});
