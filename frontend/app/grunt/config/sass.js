/**
 * Created by apium on 26/07/2016.
 */
module.exports = function(grunt) {
    'use strict';

    return {
        dist: {
            options: {
                outputStyle: 'compressed'
            },
            files: {
                'build/<%= pkg.name %>.<%= process.env.now %>.min.css': 'assets/scss/main.scss'
            }
        },
        dev: {
            options: {
                outputStyle: 'compressed'
            },
            files: {
                'build/<%= pkg.name %>.min.css': 'assets/scss/main.scss'
            }
        }
    };
};
