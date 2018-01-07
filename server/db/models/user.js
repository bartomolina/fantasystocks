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

  const hasSecurePassword = function(user, options) {
    if (user.password != user.password_confirmation) {
      throw new Error("Passwords doesn't match")
    }
    return new Promise(function(resolve, reject) {
      bcrypt.hash(user.get('password'), 10, function(err, hash) {
        if (err) {
          return reject(err)
        }
        return resolve(hash)
      })
    })
  }

  User.beforeCreate(function(user, options) {
    if (user.password) {
      return hasSecurePassword(user, options).then(hash => {
        user.set('password_digest', hash)
      })
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
