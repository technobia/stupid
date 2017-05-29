/**
 * Created by kevin on 2/9/15.
 */
module.exports = function(grunt) {
    return {
        compile: {
            options: {
                baseUrl: './src',
                mainConfigFile: 'src/require.cfg.js',
                out: 'build/<%= pkg.name %>.<%= process.env.now %>.min.js',
                optimize: 'uglify2',
                preserveLicenseComments: false,
                generateSourceMaps: false
            }
        }
    };
};
