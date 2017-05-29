/**
 * Created by apium on 15/07/15.
 */
define([
    'framework',
    'settings/Run'
], function(ApplicationFactory, AngularRun) {

    /** AngularJS App Configuration **/
    function AngularConfig($routeProvider, $locationProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $routeProvider
            .when('/home', {
                templateUrl: 'templates/homepage/homepage.html'
            })
            .when('/terms-of-use-legal-notice', {
                templateUrl: 'src/ui/homepage/templates/terms-of-use-legal-notice.html'
            })
            .when('/results', {
                templateUrl: 'templates/result/result.html',
                controller: 'ResultController'
            })
            .when('/details', {
                templateUrl: 'templates/detail/detail.html',
                controller: 'DetailController'
            })
            .when('/buy-now', {
                templateUrl: 'templates/buy-now/buy-now.html',
                controller: 'BuyNowController'
            })
            .when('/ask-us', {
                templateUrl: 'templates/ask-us/ask-us.html',
                controller: 'AskUsController'
            })
            .otherwise({
                templateUrl: 'templates/404.html'
            });
    }

    AngularConfig.$inject = ['$routeProvider', '$locationProvider', '$qProvider'];

    var app = ApplicationFactory.newInstance({
        angularConfig: AngularConfig,
        angularModules: [
            'templates',
            'ngRoute',
            'ngAnimate',
            'ui.bootstrap',
            'rzModule'
        ],
        components: [
            'ui/homepage/cmvp/HomepageController',
            // 'ui/step1/cmvp/StepOneController',
            // 'ui/step2/cmvp/StepTwoController',
            // 'ui/step3/cmvp/StepThreeController',
            'ui/modal/cmvp/InformController',
            'directive/keyNavigateDirective',
            // NEW C.M.V.P
            'ui/buy-now/BuyNowController',
            'ui/ask-us/AskUsController',
            'ui/result/ResultController',
            'ui/detail/DetailController',
            'ui/plan/PlanController',
            'ui/header/HeaderController'
        ],
        angularRun: AngularRun
    });

    return app;

});
