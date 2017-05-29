/**
 * Created by jose on 01/07/2015.
 */
module.exports = function(grunt) {
    return {
        options: {
            context: {
                pkg_name: '<%= pkg.name %>',
                now: '<%= process.env.now %>'
            }
        },
        dev: {
            inline: true,
            src: './templates/index-dev.html.tmpl',
            dest: './index.html'
        },
        prod: {
            inline: true,
            src: './templates/index-prod.html.tmpl',
            dest: './index.html'
        }
    };
};
