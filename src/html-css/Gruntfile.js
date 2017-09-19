module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            dist: {
                src: ['js/libs/*.js', 'js/main.js'
                ],
                dest: 'js/production/production.js'
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },

                files: {
                    // target.css file: source.less file
                    "css/main.css": "css/style.less"
                    //"css/ie-prod.css": "css/ie.css"
                }
            }
        },
        uglify: {
            build: {
                src: 'js/production/production.js',
                dest: 'js/production/production.min.js'
            }
        },
        // imagemin: {
        //     dynamic: {
        //         files: [
        //             {
        //                 expand: true,
        //                 cwd: 'img/',
        //                 src: ['**/*.{png,jpg,gif}'],
        //                 dest: 'img/'
        //             }
        //         ]
        //     }
        // },
        watch: {
            less: {
                files: ['css/*.less', 'css/ie.css'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: ['js/main.js', 'js/libs/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

//   grunt.registerTask('default', ['concat', 'less', 'uglify', 'imagemin']);
//   grunt.registerTask('default', ['concat', 'less', 'uglify']);
    grunt.registerTask('default', ['watch']);

};