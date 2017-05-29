define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
    var View = require('ui/plan/PlanView');

    function PlanController($scope, $rootScope, $location) {
        BaseController.constructor(this, {
            $scope: $scope,
            $rootScope: $rootScope,
            $location: $location
        }, View);
    }

    PlanController.$inject = ['$scope', '$rootScope', '$location'];
    return PlanController;
});
