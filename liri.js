require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var inputArg = process.argv;
var toAppend = "";

function LIRI(inputArg) {
    if (inputArg[2] === "my-tweets") {
        var params = {screen_name: 'LiriTesty'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                tweets.forEach(function(item, index) {
                    console.log(item.text);
                    toAppend += item.text + "\n";
                })
            }
        });
    }

    else if (inputArg[2] === "spotify-this-song") {

        var songName = "";

        for (i = 3; i < inputArg.length; i++) {
                songName += inputArg[i] + " ";
        }

        if (!songName) {
            songName = "The Sign Ace of Base";
        }
        
        spotify.search({type: 'track', query: songName.trim()}, function(error, data) {
            
            if (error) {
                return console.log(error);
            }

            console.log(data.tracks.items[0].artists[0].name + "\n" + data.tracks.items[0].name + "\n" + data.tracks.items[0].preview_url + "\n" + data.tracks.items[0].album.name + "\n");
            toAppend = data.tracks.items[0].artists[0].name + "\n" + data.tracks.items[0].name + "\n" + data.tracks.items[0].preview_url + "\n" + data.tracks.items[0].album.name + "\n";
        })
    }

    else if (inputArg[2] === "movie-this") {

        var movieTitle = "";

        for (i = 3; i < inputArg.length; i++) {
                movieTitle += inputArg[i] + " ";
        }

        if (!movieTitle) {
            movieTitle = "Mr. Nobody";
        }
        
        request("http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle.trim(), function(error, response, body) {
            if (error) {
                return console.log(error);
            }

            data = JSON.parse(body);
            console.log(data.Title + "\n" + data.Year + "\n" + data.Ratings[0].Value + "\n" + data.Ratings[1].Value + "\n" + data.Country + "\n" + data.Language + "\n" + data.Plot + "\n" + data.Actors + "\n");
            toAppend = data.Title + "\n" + data.Year + "\n" + data.Ratings[0].Value + "\n" + data.Ratings[1].Value + "\n" + data.Country + "\n" + data.Language + "\n" + data.Plot + "\n" + data.Actors + "\n";
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

    //might want to write as seperate function so "do-what-it-says" command is registered here as well
    fs.appendFile("log.txt", [inputArg, "\n", toAppend], function(error, data) { //in each block of code, create a toAppend object that will include what is output to the console.  This object will then be appended to log.txt with this function
        if (error) {
            return console.log(error);
        }

        console.log("log.txt was updated \n");
    })
}

LIRI(inputArg);