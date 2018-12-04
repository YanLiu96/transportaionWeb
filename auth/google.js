var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })

});


passport.use(new GoogleStrategy({
        clientID: "916453518762-fmceba3use5at73lvncmj5hhn7unc96g.apps.googleusercontent.com",
        clientSecret: "yQkIaEkga0RoI0q5xzArEULo",
        callbackURL: "/auth/google/callback"
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
