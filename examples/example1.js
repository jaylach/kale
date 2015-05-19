var kale = require('../index');

kale.addAction('startsWith', function(input, value) {
  return input.indexOf(value) === 0;
});

var compiled = kale.compile('**/*.kale');

var testData = {
  userId: 1,
  userName: 'codeGrit',
  password: 'bad_idea',
  firstName: 'code',
  lastName: 'Grit',
  street1: '123 Main Street',
  city: 'Over',
  state: 'There',
  zipCode: '00001',
  phones: [
    { number: '(888) 888-8881', type: 'home' },
    { number: '(888) 888-8882', type: 'mobile' },
    { number: '(888) 888-8883', type: 'other' },
  ]
};

var testArray = [
  {
    userId: 1,
    userName: 'codeGrit',
    password: 'bad_idea',
    firstName: 'code',
    lastName: 'Grit',
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
    userName: 'codeSplit',
    password: 'great_idea',
    firstName: 'toy',
    lastName: 'S',
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
  user: 'code'
});

console.log(JSON.stringify(result));

//console.log(kale.getBrowserScript(__dirname + '/examples/example1.kale'));