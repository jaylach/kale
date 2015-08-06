var kale = require('../index');

/*kale.addAction('startsWith', function(input, value) {
  return input.indexOf(value) === 0;
});*/

var compiled = kale.compile('**/*.kale');

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

var result = compiled.user(testArray, {
  user: 'jlach'
});

console.log(JSON.stringify(result));

//console.log(kale.getBrowserScript(__dirname + '/examples/example1.kale'));