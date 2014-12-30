"use strict";

var fs = require('fs');
var path = require('path');
var Compiler = require('./compiler');
var Engine = require('./engine');

var parser = require('./parser').parser;
parser.yy = require('./nodes');

var glob = require('glob');
var beautify = require('js-beautify').js_beautify;
var _ = require('lodash');

// Create our engine
var $engine = new Engine();
var _kaleActions = require('./actions');

_.forEach(_.pairs(_kaleActions), function(pair) {
  var name = pair[0];
  var action = pair[1];

  $engine.addAction(name, action);
});

// -----
//  Kale Functions
// -----

// getBrowserScript()
var getBrowserScript = function _getBrowserScript(files, mode) {
  var result = {};
  files.forEach(function(file) {
    var contents = fs.readFileSync(file, 'utf8');  
    var ast = parser.parse(contents);

    var c = new Compiler(ast);
    _.extend(result, c.compile());

    c = null;
  });

  var browserTemplate = fs.readFileSync(__dirname + '/browser/' + mode + '.js', 'utf8');
  var engineScript = fs.readFileSync(__dirname + '/engine.js', 'utf8');
  engineScript = engineScript.replace('module.exports =', 'return');

  var actionsScript = '';
  _.forEach(_.pairs(_kaleActions), function(pair) {
    var name = pair[0];
    var action = pair[1];

    actionsScript += 'this._actions["' + name + '"]=' + action.toString();
  });  


  engineScript = engineScript.replace('//= #{actions}', actionsScript);
  browserTemplate = browserTemplate.replace('//= #{engine}', engineScript);

  var templatesScript = '';
  _.forEach(_.pairs(result), function(pairs) {
    var name = pairs[0]; 
    var func = pairs[1];

    templatesScript += 'Engine.prototype["' + name + '"] = ' + func + '\n';
  });

  browserTemplate = browserTemplate.replace('//= #{templates}', templatesScript);
  return beautify(browserTemplate, { indent_size: 2 });
}; //- getBrowserScript()


// compileFile()
var compileFile = function compileFile(fileName) {
  var string = fs.readFileSync(fileName, 'utf8');
  var ast = parser.parse(string);
  
  var c = new Compiler(ast);
  var result = c.compile();

  _.forEach(_.pairs(result), function(pairs) {
    $engine._addTemplate(pairs[0], pairs[1]);
  });
}; //- compileFile()

// compile()
var compile = function compile(fileGlob) {
  var files = glob.sync(fileGlob);

  if ( Array.isArray(files) ) {
    files.forEach(function(file) {
      compileFile(file);
    });
  }

  return $engine;
}; //- compile()

// addAction()
var addAction = function addAction(actionName, actionFunc) {
  $engine.addAction(actionName, actionFunc);
}; //- addAction()

// Exports
module.exports = {
  compile: compile,
  addAction: addAction,
  getBrowserScript: getBrowserScript
};