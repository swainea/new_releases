module.exports = function(grunt) {
  'use strict';
    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: true
        },
            all: [ 'app/**/*.js' ]
        },

        sass: {
            project: {
                files: {
                    'build/css/main.css': 'app/scss/main.scss'
                }
            }
        },


        watch: {
            js: {
                files: [ 'app/**/*.js' ],
                tasks: [ 'js-build' ]
            },
            sass: {
                files: [ 'app/scss/*.scss' ],
                tasks: [ 'css-build' ]
            },
            html: {
                files: ['app/**/*.html'],
                tasks: ['copy:html']
            }
        },

        clean: [ 'build/' ],

        copy: {
            html: {
                expand: true,
                src: ['**/*.html'],
                dest: 'build/',
                cwd: 'app/'
            },
            img: {
                expand: true,
                src: ['**/*.png'],
                dest: 'build/',
                cwd: 'app/'
            },
            img2: {
                expand: true,
                src: ['**/*.jpg'],
                dest: 'build/',
                cwd: 'app/'
            }
        },

        concat: {
            options: {
                separator: ';',
                sourceMap: true
            },
            js: {
                src: [ 'app/shared/app.module.js', 'app/**/*.js' ],
                dest: 'build/js/app.js',
            },
        },

        karma: {
          app: {
            options: {
              frameworks: ['mocha', 'chai'],
              client: {
                mocha: {
                  ui: 'tdd'
                }
              },
              browsers: ['PhantomJS'],
              singleRun: true,
              files: [
                'node_modules/angular/angular.js',
                'node_modules/angular-ui-router/release/angular-ui-router.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'app/shared/app.module.js',
                'test/specs/new-releases.controller.js',
                'app/**/*.js'
              ],
              preprocessors: {
                'app/new-releases/new-releases.controller.js': ['coverage']
                // 'app/shared/spotify.service.js': ['coverage']
                // 'app/login/login.controller.js': ['coverage']
              },
              reporters: ['progress', 'coverage'],
              coverageReporter: {
                type: 'text-summary'
            }
          }
        }
      }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('js-build', ['jshint', 'concat:js']);
    grunt.registerTask('css-build', ['sass']);
    grunt.registerTask('default', ['clean', 'copy', 'js-build', 'css-build']);

};
