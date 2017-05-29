module.exports = function(grunt) {
    return {
        copy: {
            expand: true,
            cwd: 'assets/fonts',
            src: '**',
            dest: 'build/fonts/'
        }
    };
};
