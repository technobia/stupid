define(function(require) {
    'use strict';

    var Q = require('q');

    function Inform(di) {
        this.Q = di.Q;
    }

    Inform.newInstance = function(di) {
        di.Q = di.Q || Q;
        return new Inform(di);
    };

    Inform.prototype.initModel = function() {
        return this.Q({});
    };

    return Inform;
});
