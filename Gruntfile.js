module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: grunt.file.readYAML('_config.yml'),

    path: {
      src: './src',
      dev: './dev',
      dest: './_gh-pages',
      tmp: './tmp'
    },

    clean: {
      dev: ['<%= path.dev %>', '<%= path.tmp %>', '<%= path.dest %>']
    },

    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss/vendor/font-awesome/fonts',
            src: ['*.*'],
            dest: '<%= path.dev %>/fonts'
          }
        ]
      },
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss/vendor/font-awesome/fonts',
            src: ['*.*'],
            dest: '<%= path.dest %>/fonts'
          }
        ]
      }
    },

    eslint: {
      target: ['Gruntfile.js']
    },

    assemble: {
      options: {
        marked: {},
        layoutdir: '<%= path.src %>/layouts',
        partials: ['<%= path.src %>/partials/**/*.hbs', '<%= path.src %>/markdown/**/*.md'],
        helpers: ['handlebars-helper-md']
      },
      dev: {
        options: {
          production: false,
          layout: 'default.hbs',
          assets: '<%= path.dev %>'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages',
            src: '**/*.{hbs,md}',
            dest: '<%= path.dev %>'
          }
        ]
      },
      build: {
        options: {
          production: true,
          layout: 'default.hbs',
          assets: '<%= path.dest %>'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages',
            src: '**/*.{hbs,md}',
            dest: '<%= path.dest %>'
          }
        ]
      }
    },

    sass: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss',
            src: ['*.scss'],
            dest: '<%= path.dev %>/css',
            ext: '.css'
          }
        ]
      },
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss',
            src: ['*.scss'],
            dest: '<%= path.dest %>/css',
            ext: '.css'
          }
        ]
      }
    },

    connect: {
      server: {
        options: {
          base: '<%= path.dev %>',
          livereload: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['src/**/*.{hbs,md}'],
        tasks: ['assemble:dev'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass:dev'],
        options: {
          spawn: false
        }
      }
    }
  });


  grunt.registerTask('default', ['clean', 'eslint']);
  grunt.registerTask('serve', ['clean', 'copy:dev', 'assemble:dev', 'sass:dev', 'connect', 'watch']);
  grunt.registerTask('build', ['clean', 'copy:build', 'assemble:build', 'sass:build']);
};
