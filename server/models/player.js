'use strict'

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    avatar: DataTypes.STRING
  })

  return Player
}
