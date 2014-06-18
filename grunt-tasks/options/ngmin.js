'use strict';
module.exports = function(grunt) {
    grunt.config('ngmin', {
        dist: {
            files: [
                {
                    expand: true,
                    cwd: '<%= grunt.config.dist %>/scripts/',
                    src: '*.js',
                    dest: '<%= grunt.config.dist %>/scripts/'
                }
            ]
        },
        component: {
            files: [
                {
                    expand: true,
                    cwd: '<%= grunt.config.dist %>/scripts/',
                    src: '*.js',
                    dest: '<%= grunt.config.dist %>/scripts/'
                }
            ]
        }
    });
};