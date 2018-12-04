var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

passport.use(new FacebookStrategy({
        clientID: "285125035355199",
        clientSecret: "4d816a937e2b9b028b5447fee96a524e",
        callbackURL: "auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

module.exports = passport;
