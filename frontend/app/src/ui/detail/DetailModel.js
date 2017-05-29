define(function(require) {
    'use strict';

    var Q = require('q');
    var LocalStorage = require('cmvp/services/LocalStorage');

    function Detail(di) {
        this.di = di;
        this.localStorage = di.localStorage;
    }

    Detail.newInstance = function(di) {
        di.Q = di.Q || Q;
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        return new Detail(di);
    };

    Detail.prototype.initModel = function() {
        var details = this.localStorage.get('details');
        return details;
    };

    return Detail;
});
