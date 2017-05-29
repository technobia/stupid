define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
    var View = require('ui/detail/DetailView');

    function DetailController($scope, $rootScope, $location) {
        BaseController.constructor(this, {
            $scope: $scope,
            $rootScope: $rootScope,
            $location: $location
        }, View);
    }

    DetailController.$inject = ['$scope', '$rootScope', '$location'];
    return DetailController;
});
