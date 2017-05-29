requirejs.config({
    'baseUrl': '/base/src',
    'paths': {
        'lodash': '/base/node_modules/postal/node_modules/lodash/dist/lodash.min',
        'postal': '/base/node_modules/postal/lib/postal.min',
        'q': '/base/node_modules/q/q',
        'cmvp': '/base/node_modules/cmvp-framework/src/cmvp',
        'test-helpers': '/base/node_modules/cmvp-framework/src/test-helpers',
        'sinon': '/base/node_modules/sinon/lib/sinon',
        'meld': '/base/node_modules/meld/meld',
        'money': '/base/node_modules/money/money',
        'moment': '/base/node_modules/moment/min/moment.min',
        'intro': '/base/node_modules/intro.js/minified/intro.min'
    },
    callback: runTests
});

function runTests() {
    var tests = [];
    for (var file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            if (endsWith(file, 'Test.js')) {
                tests.push(file);
            }
        }
    }

    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    require(tests, window.__karma__.start);
}
