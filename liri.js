var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var myTweets = "";
var fs = require("fs");

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
var action = process.argv[2];
var input = process.argv.splice(3).join(" ");

function work() {
  switch (action) {
    case "my-tweets":
      twitter();
      writeToFile();
      break;
    case "spotify-this-song":
      spotifySong();
      writeToFile();
      break;
    case "movie-this":
      movie();
      writeToFile();
      break;
    case "do-what-it-says":
      dowhat();
      writeToFile();
      break;
  }
}
work();

function logOut(input) {
  console.log(input);
  fs.appendFile("log.txt", "Data Returned from action: " + input + "\n", function(err) {

    if (err) {
      return logOut(err);
    }



  });

}

function twitter() {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (tweet in tweets) {
        myTweets = (tweets[tweet].text);
        logOut(myTweets);
      }

    }
  })
};

function spotifySong(action) {

  spotify.search({
    type: 'track',
    query: input
  }, function(err, data) {
    if (err) {
      return logOut('Error occurred: ' + err);
    }
    logOut(data);
  });
};

function movie() {

  var queryUrl = "http://www.omdbapi.com/?t=" + (input || "Mr.Nobody") + "&y=&plot=short&apikey=40e9cece";

  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      logOut("Title: " + JSON.parse(body).Title);
      logOut("Release Year: " + JSON.parse(body).Year);
      logOut("IMDB Rating: " + JSON.parse(body).imdbRating);
      logOut("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      logOut("Language: " + JSON.parse(body).Language);
      logOut("Actors: " + JSON.parse(body).Actors);
      logOut("Plot: " + JSON.parse(body).Plot);
    }
  });
};

function dowhat() {

  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return logOut(error);
    }

    logOut(data);

    var dataArr = data.split(",");
    action = dataArr[0];
    input = dataArr[1];
    work(action, input);
  });
};

function writeToFile() {
  fs.appendFile("log.txt", "Action completed: " + action + "\n",
    function(err) {

      if (err) {
        return logOut(err);
      }



    });
}
