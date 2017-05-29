requirejs.config({
    'baseUrl': '/src',
    'paths': {
        'lodash': '../node_modules/postal/node_modules/lodash/dist/lodash.min',
        'conduitjs': '../node_modules/postal/node_modules/conduitjs/lib/conduit.min',
        'angular-route': '../node_modules/angular-route/angular-route.min',
        'angular': '../node_modules/angular/angular.min',
        'jquery': '../node_modules/jquery/dist/jquery.min',
        'postal': '../node_modules/postal/lib/postal.min',
        'q': '../node_modules/q/q',
        'framework': '../node_modules/cmvp-framework/src/ApplicationFactory',
        'cmvp': '../node_modules/cmvp-framework/src/cmvp',
        'meld': '../node_modules/meld/meld',
        'templates': '../build/templates',
        'requirejs': '../node_modules/requirejs/require',
        'bootstrap': '../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min',
        'angular-bootstrap': '../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls',
        'angular-animate': '../node_modules/angular-animate/angular-animate.min',
        'angular-touch': '../node_modules/angular-touch/angular-touch.min',
        'money': '../node_modules/money/money',
        'angular-slider': '../node_modules/angularjs-slider/dist/rzslider.min',
        'moment': '../node_modules/moment/min/moment.min',
        'intro': '../node_modules/intro.js/minified/intro.min'
    },

    'shim': {
        'angular': {
            exports: 'angular'
        },

        'angular-route': {
            deps: [ 'angular' ],
            exports: 'angular-route'
        },

        'jquery': {
            exports: '$'
        },

        'framework': {
            deps: ['angular'],
            exports: 'ApplicationFactory'
        },

        'postal': {
            exports: 'postal'
        },

        'bootstrap': {
            deps: ['jquery']
        },

        'angular-animate': {
            deps: [ 'angular' ],
            exports: 'angular-animate'
        },

        'angular-touch': {
            deps: [ 'angular' ],
            exports: 'angular-touch'
        },

        'angular-bootstrap': {
            deps: [ 'angular', 'angular-animate', 'angular-touch' ]
        }
    },

    'deps': ['main', 'angular', 'angular-route', 'jquery', 'q', 'postal', 'meld', 'framework', 'bootstrap', 'angular-animate', 'angular-touch', 'angular-bootstrap', 'money', 'angular-slider', 'moment', 'intro'],
    'callback': function(main, angular) {
        angular.module('templates', []);
    },
    // for requirejs compilation:
    'include': [
        'requirejs',
        'money',
        'lodash', 'angular-route', 'angular', 'jquery', 'postal', 'q',
        'framework', 'bootstrap', 'angular-animate', 'angular-touch', 'angular-bootstrap',
        'cmvp/services/EventBus', 'cmvp/services/AjaxService', 'cmvp/aspects/ViewRepaintAspect',
        'angular-slider',
        'moment', 'intro',
        'ui/homepage/cmvp/HomepageView',
        'ui/homepage/cmvp/HomepageModel',
        'ui/homepage/cmvp/HomepagePresenter',
        'ui/homepage/cmvp/HomepageController',
        'ui/step1/cmvp/StepOneView',
        'ui/step1/cmvp/StepOneModel',
        'ui/step1/cmvp/StepOnePresenter',
        'ui/step1/cmvp/StepOneController',
        'ui/step2/cmvp/StepTwoView',
        'ui/step2/cmvp/StepTwoModel',
        'ui/step2/cmvp/StepTwoPresenter',
        'ui/step2/cmvp/StepTwoController',
        'ui/step3/cmvp/StepThreeView',
        'ui/step3/cmvp/StepThreeModel',
        'ui/step3/cmvp/StepThreePresenter',
        'ui/step3/cmvp/StepThreeController',
        'ui/buy-now/BuyNowView',
        'ui/buy-now/BuyNowModel',
        'ui/buy-now/BuyNowPresenter',
        'ui/buy-now/BuyNowController',
        'ui/ask-us/AskUsView',
        'ui/ask-us/AskUsModel',
        'ui/ask-us/AskUsPresenter',
        'ui/ask-us/AskUsController',
        'ui/modal/cmvp/InformView',
        'ui/modal/cmvp/InformModel',
        'ui/modal/cmvp/InformPresenter',
        'ui/modal/cmvp/InformController',
        'directive/keyNavigateDirective',
        'ui/result/ResultModel',
        'ui/result/ResultPresenter',
        'ui/result/ResultController',
        'ui/result/ResultView',
        'ui/detail/DetailModel',
        'ui/detail/DetailPresenter',
        'ui/detail/DetailController',
        'ui/detail/DetailView',
        'ui/plan/PlanModel',
        'ui/plan/PlanPresenter',
        'ui/plan/PlanController',
        'ui/plan/PlanView',
        'ui/header/HeaderModel',
        'ui/header/HeaderPresenter',
        'ui/header/HeaderController',
        'ui/header/HeaderView',
        //CMVP-SCRIPT-PLACEHOLDER
        'main',
        'templates'
    ]
});

