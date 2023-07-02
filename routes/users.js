const express = require('express');
const User = require('../models/user');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const {storeReturnTo} = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp!');
            res.redirect('/campgrounds');
            console.log(registeredUser);
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'welcome back!');
    let redirectUrl = res.locals.returnTo || '/campgrounds';
    // Avoiding redirect to '/reviews' route, which returns 'Page Not Found' error'
    if (redirectUrl.includes('reviews')) {
        redirectUrl = redirectUrl.slice(0, -8);
    }
    delete req.session.returnTo;
    console.log(`redirectUrl: ${redirectUrl}`);
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out successfully');
        res.redirect('/campgrounds');
    });
})

module.exports = router;