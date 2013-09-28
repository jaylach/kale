var express = require('express');
var javelin = require('../../index');

var app = express();
app.engine('jav', javelin.express('json'));

app.set('view engine', 'jav');
app.set('views', __dirname + '/views');

app.get('/test', function(request, response) {
  var locals = {
    "foo": {
      "bar": "baz",
      "qux": "quux",
      "inner": {
        "one": "1",
        "two": "2"
      }
    },
    "outerArray": [
      { "1": "one", "2": "two" },
      { "1": "three", "2": "four" }
    ]
  };

  response.render('index', locals);
});

app.listen(4010);