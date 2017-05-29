/**
 * Created by kevin on 2/9/15.
 */
module.exports = function(grunt) {
    grunt.registerTask('deploy:dev', [
        'build:dev',
        'concurrent:dev'
    ]);
    grunt.registerTask('deploy:prod', [
        'build:prod',
        'http-server:prod'
    ]);
    grunt.registerTask('deploy:ssl', [
        'build:dev',
        'http-server:test_ssl'
    ]);
};
