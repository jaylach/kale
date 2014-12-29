var path = require('path');

// Exports
module.exports = function gruntFile(grunt) {
  // Default configuration
  var defaultConfig = {
    pkg: grunt.file.readJSON("../../package.json"),
    kale: {
      all: {
        dest: '../kale.js',
        src: '../*.kale',
        mode: 'angular'
      }
    }
  };

  grunt.initConfig(grunt.util._.extend({}, defaultConfig));

  require('./kaleTask')(grunt);

  // Default task
  grunt.registerTask('default', [ 'kale' ]);
};