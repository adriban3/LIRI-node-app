require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var omdb = require("omdb");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inputArg = process.argv;

function LIRI(inputArg) {
    if (inputArg[2] === "my-tweets") {
        var params = {screen_name: 'nodejs'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log(tweets);
            }
        });
    }

    else if (inputArg[2] === "spotify-this-song") {

        var songName = "";

        for (i = 3; i < inputArg.length; i++) {
            if (i = 3) {
                songName += inputArg[i];
            }
            
            else {
                songName += " " + inputArg[i];
            }
        }

        if (!songName) {
            songName = "The Sign";
        }

        spotify.search({type: 'track', query: songName}, function(error, data) {
            if (error) {
                return console.log(error);
            }

            console.log(data);
        })
    }

    else if (inputArg[2] === "movie-this") {

        var movieTitle = "";

        for (i = 3; i < inputArg.length; i++) {

            if (i = 3) {
                movieTitle += inputArg[i];
            }

            else {
                movieTitle += " " + inputArg[i];
            }
        }

        if (!movieTitle) {
            movieTitle = "Mr. Nobody";
        }

        omdb.get(movieTitle, true, function(error, data) {
            if (error) {
                return console.log(error);
            }

            console.log(data);
        })
    }

    else if (inputArg[2] === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }

            console.log(data) //next two lines won't work properly because of the comma, should you use data.split to append to array, or a different method to simply remove the comma
            inputArg = data;
            LIRI(inputArg);
        })
    }

    fs.appendFile("log.txt", [inputArg, toAppend], function(error, data) { //in each block of code, create a toAppend object that will include what is output to the console.  This object will then be appended to log.txt with this function
        if (error) {
            return console.log(error);
        }

        console.log("log.txt was update");
    })
}

LIRI(inputArg);