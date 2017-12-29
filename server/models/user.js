'use strict'

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    balance: DataTypes.FLOAT,
    googleId: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    picture: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_confirmation: DataTypes.VIRTUAL
  })

  var hasSecurePassword = function(user, options, callback) {
    if (user.password != user.password_confirmation) {
      throw new Error("Passwords doesn't match")
    }
    bcrypt.hash(user.get('password'), 10, function(err, hash) {
      if (err) {
        return callback(err)
      }
      user.set('passowrd_digest', hash)
      return callback(null, options)
    })
  }

  User.beforeCreate(function(user, options, callback) {
    if (user.password) {
      hasSecurePassword(user, options, callback)
    } else {
      return callback(null, options)
    }
  })

  User.prototype.authenticate = function(value) {
    if (bcrypt.compareSync(value, this.password_digest)) {
      return this
    } else {
      return false
    }
  }

  User.registerUser = function(id, userInfo) {
    return User.findOrCreate({ where: id, defaults: userInfo }).then(
      ([user, created]) => {
        return user
      }
    )
  }

  User.registerGoogleUser = function(profile) {
    const userInfo = {
      name: profile.name.givenName,
      picture: profile.photos
        ? profile.photos[0].value.replace('?sz=50', '')
        : null
    }

    return this.registerUser({ googleId: profile.id }, userInfo)
  }

  User.registerFacebookUser = function(profile) {
    const userInfo = {
      name: profile.name.displayName,
      picture: profile.photos ? profile.photos[0].value : null
    }

    return this.registerUser({ facebookId: profile.id }, userInfo)
  }

  // Task.associate = function(models) {
  //   // Using additional options like CASCADE etc for demonstration
  //   // Can also simply do Task.belongsTo(models.User);
  //   Task.belongsTo(models.User, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // }

  return User
}
