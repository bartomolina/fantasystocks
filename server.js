'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const models = require('./server/db/models')
const seed = require('./server/db/seed')

const app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
app.set('port', process.env.PORT || 3001)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use('/api', require('./server/api'))

app.get('/', (req, res, next) => {
  res.send('OK')
})

models.sequelize
  .sync({ force: true })
  .then(() => {
    seed()
  })
  .then(() => {
    app.listen(app.get('port'), () => {
      console.log(`Find the server at: http://localhost:${app.get('port')}/`) // eslint-disable-line no-console
    })
  })
