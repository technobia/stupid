define(function(require) {
    'use strict';
    var BaseController = require('cmvp/controllers/BaseController');
    var View = require('ui/homepage/cmvp/HomepageView');

    function HomepageController($scope, $location, $rootScope) {
        BaseController.constructor(this, {
            $scope: $scope,
            $location: $location,
            $rootScope: $rootScope
        }, View);
    }

    HomepageController.$inject = ['$scope', '$location', '$rootScope'];
    return HomepageController;
});
