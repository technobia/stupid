/**
 * Created by apium on 17/05/2017.
 */
define(function(require) {
    var LocalStorage = require('cmvp/services/LocalStorage');
    var moment = require('moment');

    function AffiliateService(di) {
        this.$location = di.$location;
        this.$rootScope = di.$rootScope;
        this.localStorage = di.localStorage;
    }

    AffiliateService.newInstance = function(di) {
        di.localStorage = di.localStorage || LocalStorage.newInstance();
        return new AffiliateService(di);
    };

    AffiliateService.prototype.init = function() {
        this._getRef();
        if (this._checkHasRef()) {
            this._setRef();
        } else {
            if (this._checkExits() && this._checkExpired()) {
                window.localStorage.removeItem('ref');
            }
        }
    };

    AffiliateService.prototype._getRef = function() {
        this.data = this.localStorage.get('ref');
    };

    AffiliateService.prototype._setRef = function() {
        var data = {
            expire: moment().add(24, 'hours').toISOString(),
            ref: this.$location.search().ref
        };
        this.localStorage.set('ref', data);
    };

    AffiliateService.prototype._checkExits = function() {
        return typeof this.data === 'object';
    };

    AffiliateService.prototype._checkExpired = function() {
        return moment(this.data.expire).isSameOrBefore(moment());
    };

    AffiliateService.prototype._checkHasRef = function() {
        return typeof this.$location.search().ref !== 'undefined';
    };

    return AffiliateService;
});
