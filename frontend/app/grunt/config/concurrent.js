/**
 * Created by kevin on 2/9/15.
 */
module.exports = function(grunt) {
    return {
        'dev': {
            tasks: ['watch:sass', 'watch:eslint'],
            options: {
                'logConcurrentOutput': true,
                'limit': 10
            }
        },
        'watch-test': {
            tasks: ['watch:eslint', 'karma:unit'],
            options: {
                'logConcurrentOutput': true
            }
        },
        'watch-eslint': {
            tasks: ['watch:eslint'],
            options: {
                'logConcurrentOutput': true
            }
        }
    };
};
