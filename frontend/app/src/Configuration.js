/**
 * Created by kevin on 10/23/14.
 */
define(function() {
    var BACKEND = '/api/';
    return {
        api: {
            planCases: BACKEND + 'plans',
            buyNow: BACKEND + 'buynow',
            askUs: BACKEND + 'askus'
        },
        allowMultiple: true
    };
});
