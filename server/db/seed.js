'use strict'

const bcrypt = require('bcrypt')
const models = require('./models')

module.exports = function seed() {
  models.User.bulkCreate(
    [
      {
        name: 'test',
        balance: 250000,
        password_digest: bcrypt.hashSync('test', 10)
      }
    ],
    { individualHooks: true }
  )
}
