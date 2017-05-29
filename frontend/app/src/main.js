/**
 * main entry point
 */
define(function(require) {
    'use strict';
    require('jquery');
    require('angular');
    require('Configuration');
    require('angular-slider');
    var app = require('application');
    app.initialize();
});
