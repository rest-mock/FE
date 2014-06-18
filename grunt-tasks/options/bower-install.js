'use strict';
module.exports = function(grunt) {
    grunt.config('bowerInstall', {
        app: {
            ignorePath: '<%= grunt.config.app %>/',
            exclude: [
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/affix.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/alert.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/button.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/carousel.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/collapse.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/dropdown.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/modal.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/popover.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/scrollspy.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tab.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/tooltip.js',
                'bower_components/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/transition.js'
            ],
            src: ['<%= grunt.config.app %>/index.html']
        },
        karma: {
            src: 'karma.conf.js',
            fileTypes: {
                js: {
                    block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                    detect: {
                        js: /'.*\.js'/gi
                    },
                    replace: {
                        js: '\'{{filePath}}\','
                    }
                }
            }
        }
    });
};