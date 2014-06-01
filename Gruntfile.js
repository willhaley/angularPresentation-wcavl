'use strict';
module.exports = function (grunt) {

  grunt.initConfig({
    jshint : {
      options: {
        jshintrc: '.jshintrc'
      },
      all    : [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    sass   : {
      dist: {
        options: {
          style    : 'compressed',
          compass  : false,
          // Source maps are available, but require Sass 3.3.0 to be installed
          // https://github.com/gruntjs/grunt-contrib-sass#sourcemap
          sourcemap: false
        },
        files  : {
          'assets/css/main.min.css': [
            'assets/sass/app.scss'
          ]
        }
      }
    },
    uglify : {
      dist: {
        files  : {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/bootstrap/transition.js',
            'assets/js/plugins/bootstrap/alert.js',
            'assets/js/plugins/bootstrap/button.js',
            'assets/js/plugins/bootstrap/carousel.js',
            'assets/js/plugins/bootstrap/collapse.js',
            'assets/js/plugins/bootstrap/dropdown.js',
            'assets/js/plugins/bootstrap/modal.js',
            'assets/js/plugins/bootstrap/tooltip.js',
            'assets/js/plugins/bootstrap/popover.js',
            'assets/js/plugins/bootstrap/scrollspy.js',
            'assets/js/plugins/bootstrap/tab.js',
            'assets/js/plugins/bootstrap/affix.js',
            'assets/js/plugins/*.js',
            'bower/lodash/dist/lodash.min.js',
            'assets/js/_*.js',
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'assets/js/scripts.min.js.map',
          // sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
        }
      }
    },
    version: {
      options: {
        file     : 'lib/scripts.php',
        css      : 'assets/css/main.min.css',
        cssHandle: 'roots_main',
        js       : 'assets/js/scripts.min.js',
        jsHandle : 'roots_scripts'
      }
    },
    watch  : {
      sass      : {
        files: [
          'assets/sass/*.scss',
          'assets/sass/partials/*.scss',
          'assets/sass/bootstrap/*.scss'
        ],
        tasks: ['sass', 'version']
      },
      js        : {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: [/*'jshint',*/ 'uglify', 'version']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files  : [
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          'templates/*.php',
          '*.php'
        ]
      }
    },
    clean  : {
      dist: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-wp-version');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'sass',
    'uglify',
    'version'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};
