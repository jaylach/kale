var kale = require('../index');
var actions = require('../lib/actions');

process.env.KALE_ENV = 'test';

kale.render('examples/**/*.kale', {
  outPath: 'examples/templates',
  pretty: true
});

var testArray = [
  {
    userId: 1,
    userName: 'jlach',
    password: 'bad_idea',
    firstName: 'j',
    lastName: 'lach',
    street1: '123 Main Street',
    city: 'Over',
    state: 'There',
    zipCode: '00001',
    phones: [
      { number: '(888) 888-8881', type: 'home' },
      { number: '(888) 888-8882', type: 'mobile' },
      { number: '(888) 888-8883', type: 'other' },
    ]
  },
  {
    userId: 2,
    userName: 'toys',
    password: 'great_idea',
    firstName: 'toy',
    lastName: 's',
    street1: '123 Main Street',
    city: 'Over',
    state: 'There',
    zipCode: '00001',
    phones: [
      { number: '(888) 888-8881', type: 'home' },
      { number: '(888) 888-8882', type: 'mobile' },
      { number: '(888) 888-8883', type: 'other' },
    ]
  },
];

var result = require('./templates/user')(testArray);
console.log(JSON.stringify(result));

//console.log(kale.getBrowserScript(__dirname + '/examples/example1.kale'));