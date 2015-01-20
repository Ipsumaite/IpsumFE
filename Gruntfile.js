module.exports = function(grunt) {

    
  var prjConfig = {
    app: '.',
    dist: 'dist',
    test: 'test'
  };
    
  var rewrite = require('connect-modrewrite');
    
  grunt.initConfig({
      
     //Project Settings
     appfolder: prjConfig,
     copy: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= appfolder.app %>/src',
                src: ['**'],
                dest: '<%= appfolder.dist %>'
            },{
                expand: true,
                cwd: '<%= appfolder.app %>',
                src: ['lib/**', 'node_modules/angular/angular.js',
                      '.htaccess',
                     'node_modules/angular/angular.js.map',
                     'node_modules/jquery/dist/**',
                     'node_modules/angular-ui-router/release/angular-ui-router.js',
                     'src/package.json', 'node_modules/bootstrap/dist/**', 'package.json'],
                dest: '<%= appfolder.dist %>'
            }]
        }
     },
     connect: {
       options: {
            port: 9000,
            base: '<%= appfolder.dist %>',
            hostname: '127.0.0.1'
       },
       livereload: {
            options: {
                open: true,
                  middleware: function (connect) {
                    return [
                      connect.static('.tmp'),
                      connect.static(prjConfig.dist)
                    ];
                  }
            }
      },
      Myapp: {
          options: {
            port: 9000,
            base: '<%= appfolder.dist %>',
            keepalive: true,
            middleware: function(connect, options) {

                    var middleware = [];
                    // 1. mod-rewrite behavior
                    var rules = [
                        '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                    ];
                    middleware.push(rewrite(rules));

                    // 2. original middleware behavior
                    var base = options.base;
                    if (!Array.isArray(base)) {
                        base = [base];
                    }
                    base.forEach(function(path) {
                        middleware.push(connect.static(path));
                    });
                    return middleware;
            }
          }
      }
    },
    karma: {
        unit: {
            configFile: '<%= appfolder.test %>/karma.Unit.conf.js',
            singleRun: true
        }
    },
    clean: {
        dist:['<%= appfolder.dist %>/*']
    },
    watch: {
        src: {
            tasks: ['build'],
            files: ['<%= appfolder.app %>/src/**/*'],
            options: {
                //Start a live reload server on the default port 35729
                livereload: '<%= connect.options.livereload %>'
            }
        }
    }


  });
    
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload'); 
  grunt.loadNpmTasks('grunt-contrib-watch');    
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['clean', 'copy']);
  grunt.registerTask('start', ['build','connect:Myapp']);
    
  grunt.registerTask('server', 'Compile and starting the web server', function (target) {
    grunt.task.run([
      'build',
      'connect:livereload',
      'watch'
    ]);
  });

    
    

};