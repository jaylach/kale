#!/usr/bin/env node

var clc = require('cli-color');
var program = require('commander');

var kale = require('../lib/kale');
var pkg = require('../package.json');

var HEADER = clc.bgBlack.greenBright(' kale ');
var ERROR = clc.red;

// log()
var log = function log() {
  if ( program.silent === true ) return;

  var args = Array.prototype.slice.call(arguments);
  args.unshift(HEADER);

  console.log.apply(null, args);
}; //- log()

program
  .version(pkg.version)
  .usage('<glob ...> [options]')
  .option('-o, --out <path>', 'The folder to write compiled templates to.')
  .option('-p, --pretty', 'Pretty print compiled templates.')
  .option('-s, --silent', 'Mute console logs during rendeirng.')
  .parse(process.argv);

if ( program.out == null ) {
  console.log(HEADER, ERROR('No output path provided!'));
  return;
}
if ( program.args == null || program.args.length === 0 ) {
  console.log(HEADER, ERROR('No input file glob provided!'));
  return;
}

var options = {
  outPath: program.out,
  pretty: program.pretty
};

program.args.forEach(function(file) {
  var start = new Date();
  log('Rendering', clc.bold(file), '...');
  var out = kale.render(file, options);

  var end = new Date();
  var diff = (end - start) / 1000;

  out.forEach(function(result) {
    log('Rendered', clc.bold(result.name), 'to', clc.bold(result.file), '[' + diff + 's]');
  });
});
