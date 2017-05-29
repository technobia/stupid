define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
    var View = require('ui/header/HeaderView');

    function HeaderController($scope, $rootScope, $location) {
        BaseController.constructor(this, {
            $scope: $scope,
            $rootScope: $rootScope,
            $location: $location
        }, View);
    }

    HeaderController.$inject = ['$scope', '$rootScope', '$location'];
    return HeaderController;
});
