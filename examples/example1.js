var kale = require('../index');

var compiled = kale.compileFile(__dirname + '/example1.kale');

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

var result = compiled.user(testData, {});
console.log(JSON.stringify(result));

console.log(kale._getBrowserScript(__dirname + '/example1.kale'));