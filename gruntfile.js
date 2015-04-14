module.exports = function(grunt) {
    require('jit-grunt')(grunt, {
        notify_hooks: 'grunt-notify',
        cmq: 'grunt-combine-media-queries',
        sprite: 'grunt-spritesmith',
        cssmin: 'grunt-cssmin',
        concat: 'grunt-contrib-concat',
        uglify: 'grunt-contrib-uglify'
    });
    grunt.initConfig({
        notify: {
            build: {
                options: {
                    title: 'Build completed',
                    message: 'Build completed without errors'
                }
            },
            sass: {
                options: {
                    title: 'Sass compiled',
                    message: 'Sass files compiled successfully'
                }
            },
            js: {
                options: {
                    title: "JSHint completed",
                    message: 'JSHint finished, no errors'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'js/build.min.js': ['js/build.js']
                }
            }
        },
        concat: {
            dist: {
                src: ['js/lib/*.js', 'js/app/**/*.js'],
                dest: 'js/build.js'
            }
        },
        jshint: {
            src: ['js/*.js']
        },
        sprite: {
            all: {
                src: 'images/sprites/*.png',
                dest: 'images/sprites.png',
                destCss: 'css/_icons.scss',
                algorithm: 'binary-tree'
            }
        },
        cssmin: {
            target: {
                files: [{
                    'css/style.min.css': ['css/style.css']
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'css',
                    cssDir: 'css',
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: 'css',
                    cssDir: 'css',
                    environment: 'production',
                    force: true
                }
            }
        },
        cmq: {
            options: {
                log: false
            },
            style: {
                files: {
                    'css': ['css/style.css']
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: ['css/*.scss', 'sass/**/*.scss'],
                tasks: ['compass:dist', 'cmq', 'notify:sass']
            },
            js: {
                files: ['js/*.js'],
                tasks: ['jshint', 'notify:js']
            }
        }
    });

    //grunt.task.run('notify_hooks');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['compass:prod', 'cmq', 'cssmin', 'notify:sass', 'concat', 'uglify']);
}
