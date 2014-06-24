module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            protoc: {
                command: function (file) {
                    return 'protoc --descriptor_set_out=' + file + '.desc --include_imports ' + file + '.proto'
                },
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        },
        jasmine_node: {
            specNameMatcher : 'spec'
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.registerTask('protos', ['shell:protoc:proto/demo', 'shell:protoc:proto/netmessages']);
    grunt.registerTask('default', ['shell:protoc:proto/demo']);
    grunt.registerTask('unit', ['jasmine_node']);
};
