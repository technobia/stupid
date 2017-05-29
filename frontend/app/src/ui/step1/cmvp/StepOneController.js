define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
    var View = require('ui/step1/cmvp/StepOneView');

    function StepOneController($scope, $location) {
        BaseController.constructor(this, {
            $scope: $scope,
            $location: $location
        }, View);
    }

    StepOneController.$inject = ['$scope', '$location'];
    return StepOneController;
});
