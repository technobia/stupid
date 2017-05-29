/**
 * Created by kevin on 2/9/15.
 */
module.exports = function(grunt) {
    return {
        dev: {
            root: '.',
            host: '0.0.0.0',
            port: '8282',
            cache: 0, // no cache!
            showDir: false,
            autoIndex: false,
            runInBackground: false
        },
        prod: {
            root: '.',
            host: '0.0.0.0',
            port: '8282',
            cache: 86400, // 1 day!
            showDir: false,
            autoIndex: false,
            runInBackground: false
        },
        test_ssl: {
            root: '.',
            host: '0.0.0.0',
            port: '8282',
            cache: 0, // no cache!
            showDir: false,
            autoIndex: false,
            runInBackground: false
        }
    };
};
