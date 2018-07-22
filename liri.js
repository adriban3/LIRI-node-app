require("dotenv").config();
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

if (process.argv[2] === "my-tweets") {
    var params = {screen_name: 'nodejs'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}

else if (process.argv[2] === "spotify-this-song") {

}

else if (process.argv[2] === "movie-this") {

}

else if (process.argv[2] === "do-what-it-says") {

}