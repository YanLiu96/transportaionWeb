var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User');

passport.use(new GitHubStrategy({
        clientID: "90b6e8ce31c6050ce848",
        clientSecret: "8ddf06b77ae0f4231c2e7bce96eb6c4d4b1a2262",
        callbackURL: "https://express-transportation.herokuapp.com/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({userid: profile.id}, {name: profile.displayName,userid: profile.id}, function (err, user) {
            return done(err, user);
        });
    }
));

module.exports = passport;
