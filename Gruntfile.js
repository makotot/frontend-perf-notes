module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({

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
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages',
            src: '**/*.{hbs,md}',
            dest: '<%= path.dev %>'
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
        tasks: ['assemble'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    }
  });


  grunt.registerTask('default', ['clean', 'eslint']);
  grunt.registerTask('compile', ['assemble', 'sass']);
  grunt.registerTask('serve', ['clean', 'copy', 'compile', 'connect', 'watch']);
};
