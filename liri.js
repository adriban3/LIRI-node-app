require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys");
var request = require("request");
var fs = require("fs");

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var inputArg = process.argv;
var toAppend = "";

var LIRI = function(inputArg) {

    var client = new Twitter(keys.twitter);
    
    if (inputArg[2] === "my-tweets") {
        console.log("Most Recent Tweets:\n");
        var params = {screen_name: 'LiriTesty'};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                tweets.forEach(function(item, index) {
                    console.log(item.text);
                    toAppend += "\n" + item.text;
                })
            }
            log("\nMost Recent Tweets: \n" + toAppend + "\n\n");
        });
    }

    else if (inputArg[2] === "spotify-this-song") {

        var spotify = new Spotify(keys.spotify);

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

            console.log("Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Track Name: " + data.tracks.items[0].name + "\n" + "Preview URL: " + data.tracks.items[0].preview_url + "\n" + "Album Name: " + data.tracks.items[0].album.name);
            toAppend = "\n" + "Artist: " + data.tracks.items[0].artists[0].name + "\n" + "Track Name: " + data.tracks.items[0].name + "\n" + "Preview URL: " + data.tracks.items[0].preview_url + "\n" + "Album Name: " + data.tracks.items[0].album.name + "\n\n";
            log(toAppend);
        })
    }

    else if (inputArg[2] === "movie-this") {

        var movieTitle = "";

        if (inputArg.length > 4) {
            for (i = 3; i < inputArg.length; i++) {
                    movieTitle += inputArg[i] + " ";
            }
        }

        else if (inputArg.length === 4) {
            movieTitle = inputArg[3];
        }

        else if (!movieTitle) {
            movieTitle = "Mr. Nobody";
        }
        
        request("http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle.trim(), function(error, response, body) {

            data = JSON.parse(body);

            if (error) {
                return console.log(error);
            }

            if (data.Response === "False") {
                return console.log(data.Error);
            }

            if (data.Ratings.length > 1) {
                console.log("Title: " + data.Title + "\n" + "Release Year: " + data.Year + "\n" + "IMDB Rating: " + data.Ratings[0].Value + "\n" + "Rotten Tomatoes Rating: " + data.Ratings[1].Value + "\n" + "Country: " + data.Country + "\n" + "Language: " + data.Language + "\n" + "Plot: " + data.Plot + "\n" + "Actors: " + data.Actors + "\n");
                toAppend = "\nTitle: " + data.Title + "\n" + "Release Year: " + data.Year + "\n" + "IMDB Rating: " + data.Ratings[0].Value + "\n" + "Rotten Tomatoes Rating: " + data.Ratings[1].Value + "\n" + "Country: " + data.Country + "\n" + "Language: " + data.Language + "\n" + "Plot: " + data.Plot + "\n" + "Actors: " + data.Actors + "\n\n";
            }

            else {
                console.log("Title: " + data.Title + "\n" + "Release Year: " + data.Year + "\n" + "IMDB Rating: " + data.Ratings[0].Value + "\n" + "Country: " + data.Country + "\n" + "Language: " + data.Language + "\n" + "Plot: " + data.Plot + "\n" + "Actors: " + data.Actors + "\n");
                toAppend = "\nTitle: " + data.Title + "\n" + "Release Year: " + data.Year + "\n" + "IMDB Rating: " + data.Ratings[0].Value + "\n" + "Country: " + data.Country + "\n" + "Language: " + data.Language + "\n" + "Plot: " + data.Plot + "\n" + "Actors: " + data.Actors + "\n\n";
            }
                log(toAppend);
        })
    }

    else if (inputArg[2] === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }

            var dataArr = data.split(",");
            inputArg.pop()
            inputArg.push(dataArr[0], dataArr[1]);
            LIRI(inputArg);
        })
    }
}

var log = function(toAppend) {
    fs.appendFile("log.txt", inputArg + "\n" + toAppend, "utf8", function(error, data) { 
        if (error) {
            return console.log(error);
        }

        console.log("\nlog.txt was updated\n");
    })
};

LIRI(inputArg);