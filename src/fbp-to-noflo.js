/*

  FBP string to Noflo graph JSON

*/

const fbp = require('fbp')

function fbpToNoflo (str) {
  return fbp.parse(str)
}

module.exports = fbpToNoflo
