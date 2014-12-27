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

    eslint: {
      target: ['Gruntfile.js']
    },

    assemble: {
      options: {
        layoutdir: '<%= path.src %>/layouts',
        partials: ['<%= path.src %>/partials/**/*.hbs']
      },
      dev: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages',
            src: '**/*.hbs',
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
        files: ['src/**/*.hbs'],
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
  grunt.registerTask('serve', ['clean', 'compile', 'connect', 'watch']);
};
