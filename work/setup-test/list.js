const path = require('path');

const people = `
Name                |  NEUID    | Slack handle         | github username
Brett Ritter        | ???       | @swiftone            | swiftone
Yashwanth Sridharan | 002102918 | @yashwanth-sridharan | yashwanth-sridharan 
`.split('\n') // convert to array of lines
.filter( line => !!line.replace(/\s/g,'' )); // Remove empty lines

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for ( person of people ) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;
