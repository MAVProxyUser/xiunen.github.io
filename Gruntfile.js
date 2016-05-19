//@deprecated, using gulp now
module.exports = function(grunt){
  grunt.initConfig({
    sass:{
      dist:{
        files:{
          'stylesheets/style.css': 'sass/style.scss'
        }
      }
    },
    cssmin:{
      target:{
        files:{
          'stylesheets/style.min.css':['stylesheets/style.css']
        }
      }
    },
    jade:{
      compile:{
        options: {
          client: false,
          pretty: true
        },
        files: [{
          cwd: "jades/",
          src: "*.jade",
          dest: "pages/",
          ext: ".html",
          expand: true
        },{
          cwd: "jades/blog",
          src: "*.jade",
          dest: "pages/blog",
          ext: ".html",
          expand: true
        },{
          cwd: "jades/example",
          src: "*.jade",
          dest: "pages/example",
          ext: ".html",
          expand: true
        },
        {
          src: "index.jade",
          ext: ".html",
          expand: true,
          dest: "./"
        }]
      }
    },
    watch: {
      styles: {
        files: ['sass/*.scss'],
        tasks: ['sass','cssmin']
      },
      htmls: {
        files: ['index.jade','jades/*.jade','jades/**/*.jade','includes/*.jade'],
        tasks: ['jade']
      }
    }
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.registerTask('default', ['sass','cssmin','jade','watch']);
}