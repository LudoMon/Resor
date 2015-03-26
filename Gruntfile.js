module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        browserify: {
            options: {
                browserifyOptions: {
                  debug: true
                },
                transform: ['jadeify']
            },
            results: {
                src: [ 'src/Resor/Bundle/CoreBundle/Resources/public/js/app/result.js' ],
                dest: 'src/Resor/Bundle/CoreBundle/Resources/public/js/results.js'
            },
            booking: {
                src: [ 'src/Resor/Bundle/CoreBundle/Resources/public/js/app/booking.js' ],
                dest: 'src/Resor/Bundle/CoreBundle/Resources/public/js/booking.js'
            }
        },
    })

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['browserify'])

};