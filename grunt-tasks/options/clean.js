'use strict';
module.exports = function(grunt) {
    grunt.config('clean', {
        dist: {
            files: [{
                dot: true,
                src: [
                    '<%= grunt.config.dist %>/*',
                    '!<%= grunt.config.dist %>/.git*'
                ]
            }]
        }
    });
};