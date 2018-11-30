var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');

passport.use(new GoogleStrategy({
        clientID: "916453518762-fmceba3use5at73lvncmj5hhn7unc96g.apps.googleusercontent.com",
        clientSecret: "yQkIaEkga0RoI0q5xzArEULo",
        callbackURL: "https://express-transportation.herokuapp.com/auth/google/callbacks"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
));
module.exports = passport;
