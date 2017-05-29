/**
 * Created by kevin on 2/9/15.
 */
module.exports = function(grunt) {
    grunt.registerTask('build:dev', [
        'sass:dev',
        'preprocess:dev',
        'ngtemplates',
        'copy:copy'
    ]);
    grunt.registerTask('build:prod', [
        'sass:dist',
        'preprocess:prod',
        'ngtemplates',
        'requirejs:compile',
        'copy:copy'
    ]);
};
