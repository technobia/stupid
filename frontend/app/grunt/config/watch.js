/**
 * Created by kevin on 2/9/15.
 */
module.exports = function(grunt) {
    var scssFiles = 'assets/scss/**/*.scss';
    var jsFiles = 'src/**/*.js';
    var templatesFiles = 'templates/**/*.html';
    return {
        'sass': {
            files: scssFiles,
            tasks: ['sass:dev']
        },
        'js': {
            files: jsFiles,
            tasks: ['requirejs:compile']
        },
        'livereload': {
            files: [scssFiles, jsFiles, templatesFiles],
            options: {
                livereload: 35729
            }
        },
        'eslint': {
            options: {
                atBegin: true
            },
            files: ['src/**/*.js', 'test/**/*.js', 'grunt/**/*.js', 'Gruntfile.js'],
            tasks: ['eslint:check']
        }
    };
};
