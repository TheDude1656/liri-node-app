var Twitter = require('twitter');
var keys = require("./keys.js").twitterKeys;


for (var prop in keys) {
  console.log(`${prop} = ${keys[prop]}`);

}

console.log(`${keys[0]}`)
// client.get('search/tweets', {
//   q: 'node.js'
// }, function(error, tweets, response) {
//   console.log(tweets);
// });
