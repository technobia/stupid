define(function(require) {
    'use strict';

    var Q = require('q');

    function Header(di) {
        this.di = di;
    }

    Header.newInstance = function(di) {
        di.Q = di.Q || Q;
        return new Header(di);
    };

    Header.prototype.initModel = function() {
        return this.di.Q({});
    };

    return Header;
});
