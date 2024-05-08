const JWtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model("users")
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = (passport) => {
  passport.use(new JWtStrategy(opts, (jwt_payload, done) => {
    console.log("1111", jwt_payload);
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => {
        console.log(err);
      })
    // User.findOne({ id: jwt_payload.sub }, function (err, user) {
    //   if (err) {
    //     return done(err, false)
    //   }
    //   if (user) {
    //     return done(null, user)
    //   } else {
    //     return done(null, false)
    //   }
    // })
  }))
}