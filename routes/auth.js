var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
var passportGoogle = require('../auth/google');
var passportGitHub = require('../auth/github');
/* LOGIN ROUTER */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Please Sign In with:' });
});

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
/* FACEBOOK ROUTER */
router.get('/facebook',
    passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
    passportFacebook.authenticate('facebook'),
    function(req, res) {
        // Successful authentication, redirect home.
        res.send(req.user)
        res.redirect('https://exprees-transportation-vue.firebaseapp.com/');
    });


/* GOOGLE ROUTER */

router.get('/google',
    //passportGoogle.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
    passportGoogle.authenticate('google', { scope:['profile']}));
router.get('/google/callback',
    passportGoogle.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('https://exprees-transportation-vue.firebaseapp.com/');
        //res.send(req.user)
    });

/* GITHUB ROUTER */

router.get('/github',
    passportGitHub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
    passportGitHub.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('https://exprees-transportation-vue.firebaseapp.com/');
    });
module.exports = router;
