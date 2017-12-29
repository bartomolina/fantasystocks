'use strict'

const router = require('express').Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const { User } = require('../models')

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id)
    .then(function(user) {
      done(null, user)
    })
    .catch(done)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ where: { googleId: profile.id } }).then(
        ([user, created]) => {
          return done(null, user)
        }
      )
    }
  )
)

router.get('/google', passport.authenticate('google', { scope: 'email' }))

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/')
  }
)

router.get('/me', (req, res, next) => {
  res.send(req.user)
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
