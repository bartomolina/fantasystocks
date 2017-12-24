'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    avatar: DataTypes.STRING
  })

  return User
}
