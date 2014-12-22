var path = require('path');
var kale = require('../../index');

module.exports = function(grunt) {
  grunt.registerMultiTask('kale', 'Example kale task.', function() {
    var newSrc = path.resolve(__dirname + '/' + this.data.src);
    var files = grunt.file.expand(newSrc);
    var script = kale.getBrowserScript(files, this.data.mode);

    var out = path.resolve(__dirname + '/' + this.data.dest);
    grunt.file.write(out, script);
  });
};