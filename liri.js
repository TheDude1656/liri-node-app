var keys = require("./keys.js").twitterKeys;
var Twitter = require("twitter");

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});

var params = {
  screen_name: '_DHole_'
};

// console.log(client);
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (tweet in tweets) {

      console.log(tweets[tweet].text);
    }

  }
});
