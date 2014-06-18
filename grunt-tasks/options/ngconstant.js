'use strict';
module.exports = function(grunt) {

    grunt.config('ngconstant', {
        options: {
            space: '    '
        },
        // Environment targets
        development: [{
            dest:  grunt.config.app+'/scripts/config.js',
            wrap: '/* jshint quotmark:true, indent:false, white: false */\n"use strict";\n\n <%= __ngModule %>',
            name: 'AppConfig',
            constants: grunt.file.readJSON(grunt.config.app+'/config.json').staging
        }],
        production: [{
            dest: grunt.config.app+'/scripts/config.js',
            wrap: '/* jshint quotmark:true, indent:false, white: false */\n"use strict";\n\n <%= __ngModule %>',
            name: 'AppConfig',
            constants: grunt.file.readJSON(grunt.config.app+'/config.json').staging
        }],
        staging: [{
            dest: grunt.config.app+'/scripts/config.js',
            wrap: '/* jshint quotmark:true, indent:false, white: false */\n"use strict";\n\n <%= __ngModule %>',
            name: 'AppConfig',
            constants:  grunt.file.readJSON(grunt.config.app+'/config.json').staging
        }]
    });
};