# LIRI-node-app

node command line app that shows varying information depending on the user's input

#my-tweets

calling the liri.js file with the "my-tweets" argument will show the user's most recent tweets.  This requires twitter api authentication and the user must create a .env file with his/her credentials.  The user must also installl the twitter npm module.

#spotify-this-song

calling the liri.js file with the "spotify-this-song '<song name>' argument will show the user information about the song that was passed.  If no song is passed then one will be chosen.  This also requires the user to provide their own spotify api credentials through a .env file.  The user must also install the spotify-node-api npm module.

#movie-this

calling the liri.js file with the "movie-this '<movie name>' argument will show the user information about the movie passed.  If no song is passed then one will be chosen.  This requires no user credentials, but the user must install the npm request module.

#do-what-it-says

calling liri.js with the "do-what-it-says" argument will run the application using whatever is stored in the "random.txt" file.  This could run any of the other three functions depending on what is stored in the file.

#.env file
as mentioned above, the user provide their own .env file containing they're own twitter and spotify api credentials

#npm modules
npm modules used in this project include node-spotify-api, twitter, request, fs, and dotenv