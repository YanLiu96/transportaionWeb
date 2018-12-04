var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/User');

passport.use(new FacebookStrategy({
        clientID: "285125035355199",
        clientSecret: "4d816a937e2b9b028b5447fee96a524e",
        callbackURL: "https://express-transportation.herokuapp.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({userid:profile.id}).then((currentUser)=>{
            if(currentUser){
                console.log('user is '+currentUser)
                done(null,currentUser)
            }else{
                new User({
                    name:profile.displayName,
                    userid:profile.id
                }).save().then((newUser)=> {
                        console.log('new user created' + newUser);
                        done(null, newUser)
                    }
                )
            }
        });
    }
));

module.exports = passport;
