define(function(require) {
    'use strict';

    var Q = require('q');

    function Homepage(di) {
        this.di = di;
    }

    Homepage.newInstance = function(di) {
        di.Q = di.Q || Q;
        return new Homepage(di);
    };

    Homepage.prototype.initModel = function() {
        return this.di.Q({});
    };

    return Homepage;
});
