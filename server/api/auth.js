'use strict'

const router = require('express').Router()
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const LocalStrategy = require('passport-local').Strategy
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

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.SESSION_SECRET

passport.use(
  new JwtStrategy(jwtOptions, function(payload, done) {
    console.log('payload received', payload)
    const user = { id: 1, name: 'bmm' }
    done(null, user)
  })
)

passport.use(
  new LocalStrategy(function(username, password, profile, done) {
    User.findOne({ username }, function(err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' })
      }
    })
  })
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.registerGoogleUser(profile).then(user => {
        return done(null, user)
      })
    }
  )
)

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENTSECRET,
      callbackURL: process.env.FACEBOOK_CALLBACKURL,
      profileFields: ['id', 'displayName', 'picture.type(large)']
    },
    function(accessToken, refreshToken, profile, done) {
      User.registerFacebookUser(profile).then(user => {
        return done(null, user)
      })
    }
  )
)

router.get(
  '/local',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  })
)

router.get('/google', passport.authenticate('google', { scope: 'email' }))

router.get('/facebook', passport.authenticate('facebook'))

router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/'
  }),
  function(req, res) {
    res.redirect('/')
  }
)

router.get('/me', (req, res, next) => {
  res.send(req.user)
})

router.post('/login', (req, res, next) => {
  console.log('logging in...')

  const user = { id: 1, name: 'bmm' }
  const payload = { id: user.id }
  const token = jwt.sign(payload, jwtOptions.secretOrKey)

  res.json({ message: 'ok', token })
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
