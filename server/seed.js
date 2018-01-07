'use strict'

const models = require('./models')

module.exports = function seed() {
  models.User.create({
    name: 'test',
    balance: 250000,
    password: 'test',
    password_confirmation: 'test'
  })
}
