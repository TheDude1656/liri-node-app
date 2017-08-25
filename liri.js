var keys = require("./keys.js");

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var myTweets = "";
var spotify = new Spotify({
  id: keys.spotifyKeys.client_id,
  secret: keys.spotifyKeys.client_secret
});
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
var params = {
  screen_name: '_DHole_'
};
var action = process.argv[2]
switch (action) {
  case "my-tweets":
    twitter();
    break;
  case "spotify-this-song":
    spotify();
    break;
  case "movie-this":
    movie();
    break;
  case "do-what-it-says":
    dowhat();
    break;
}

function twitter() {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (tweet in tweets) {
        myTweets = (tweets[tweet].text);
        console.log(myTweets);
      }
    }
  })
};

function spotify() {
  spotify.search({
    type: 'track',
    query: action
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });
};

function movie() {};

function dowhat() {};
