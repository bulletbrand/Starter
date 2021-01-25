const LocalStrategy = require('passport-local').Strategy
const BearerStrategy = require('passport-http-bearer').Strategy;
const CookieStrategy = require('passport-cookie').Strategy;
const bcrypt = require('bcrypt')
const userService = require('../services/user.service');
const userTokentService = require('../services/user-token.service');

function initialize(passport) {

  const authenticateUser = async (email, password, done) => {
    const user = await userService.getAllUser({ email: email });
    if (user.message) {
      return done(null, null, { message: 'No user with that email' })
    }
    console.log('User: ' + JSON.stringify(user));
    try {
      if (await bcrypt.compare(password, user.passwordHash)) {
        return done(null, user)
      } else {
        return done(null, null, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  const authenticateUserBearer = async (accessToken, done) => {
    console.log('accessToken: ' + accessToken);
    const token = await userTokentService.findOne({ id: accessToken });
    if (!token.message && token.isVerified === 1 && new Date(token.validToDate) >= new Date(Date.now())) {
      const user = await userService.getAllUser({ id: token.userId });
      if (!user.message) {
        const info = { scope: '*' }
        done(null, user, info);
      }
      else {
        return done(null, null);
      }
    } else {
      return done(null, null);
    }
  }

  const authenticateUserCookie = async (token, done) => {
    console.log('accessToken: ' + token);
    const accessToken = await userTokentService.findOne({ id: token });
    if (!accessToken.message && accessToken.isVerified === 1 && new Date(accessToken.validToDate) >= new Date(Date.now())) {
      const user = await userService.getAllUser({ id: accessToken.userId });
      if (!user.message) {
        const info = { scope: '*' }
        done(null, user, info);
      }
      else {
        return done(null, null);
      }
    } else {
      return done(null, null);
    }
  }

  passport.use('local', new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.use('bearer', new BearerStrategy(authenticateUserBearer));

  passport.use('cookie', new CookieStrategy(authenticateUserCookie));

  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser( async (id, done) => {
    const user = await userService.getAllUser({ id: id });
    if (!user.message) {
      return done(null, u)
    }
  })
}

module.exports = initialize
