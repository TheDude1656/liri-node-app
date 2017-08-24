var keys = require("./keys.js").twitterKeys;
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var myTweets = "";
var spotiftyclient = new Spotify({
  client_id: keys.client_id,
  client_secret: keys.client_secret
});
var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});
var params = {
  screen_name: '_DHole_'
};
var action = process.argv[2]

if (action === "my-tweets") {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (tweet in tweets) {
        myTweets = (tweets[tweet].text);
        console.log(myTweets);
      }
    }
  })
} else if (action === `spotify-this-song`) {

} else if (action === `movie-this`) {

} else if (action === `do-what-it-says`) {

}
