/**
 * Created by kevin on 2/9/15.
 */
module.exports = function(grunt) {
    return {
        app: {
            src: ['templates/**/*.html', 'src/**/*.html'],
            dest: 'build/templates.js',
            options: {
                module: 'templates',
                standalone: true,
                htmlmin: {
                  collapseBooleanAttributes:      true,
                  collapseWhitespace:             true,
                  removeAttributeQuotes:          true,
                  removeComments:                 true, // Only if you don't use comment directives!
                  removeEmptyAttributes:          true,
                  removeRedundantAttributes:      true,
                  removeScriptTypeAttributes:     true,
                  removeStyleLinkTypeAttributes:  true
                }
            }
        }
    };
};
