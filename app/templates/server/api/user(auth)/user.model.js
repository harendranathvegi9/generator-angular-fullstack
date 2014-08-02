'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');<% if(filters.oauth) { %>
var authTypes = ['github', 'twitter', 'facebook', 'google'];<% } %><% if(filters.mail) { %>
var bases = require('bases');

var reliableProvider = ['github', 'facebook', 'google'];

function randomStr(length) {
    var maxNum = Math.pow(62, length);
    var numBytes = Math.ceil(Math.log(maxNum) / Math.log(256));

    if (numBytes === Infinity) {
        throw new Error('Length too large; caused overflow: ' + length);
    }
 
    do {
        var bytes = crypto.randomBytes(numBytes);
        var num = 0
        for (var i = 0; i < bytes.length; i++) {
            num += Math.pow(256, i) * bytes[i];
        }
    } while (num >= maxNum);
 
    return bases.toBase62(num);
};
<% } %>

var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },<% if(filters.mail) { %>
  confirmedMail : { type: Boolean, default: false },
  mailConfirmationCode : {type: String},
  passwordResetCode : {type: String, default: ''},
  <% } %>
  hashedPassword: String,
  provider: String,
  salt: String<% if (filters.oauth) { %>,<% if (filters.facebookAuth) { %>
  facebook: {},<% } %><% if (filters.twitterAuth) { %>
  twitter: {},<% } %><% if (filters.googleAuth) { %>
  google: {},<% } %>
  github: {}<% } %>
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role<% if(filters.mail) { %>,
      'confirmedMail' : this.confirmedMail<% } %>
    };
  });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {<% if (filters.oauth) { %>
    if (authTypes.indexOf(this.provider) !== -1) return true;<% } %>
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {<% if (filters.oauth) { %>
    if (authTypes.indexOf(this.provider) !== -1) return true;<% } %>
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    <% if(filters.mail) { %>
    if (reliableProvider.indexOf(this.provider) !== -1) 
      this.confirmedMail = true;
    else 
      this.mailConfirmationCode = randomStr(16);
    <% } %>

    if (!validatePresenceOf(this.hashedPassword)<% if (filters.oauth) { %> && authTypes.indexOf(this.provider) === -1<% } %>)
      next(new Error('Invalid password'));
    else
      next();
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }<% if(filters.mail) { %>,

  /**
   * Set random password reset code
   *
   * @param {Function} callback
   */
  setPwResetCode: function(callback) {
    var user = this;
    user.passwordResetCode = randomStr(16);
    user.save(callback);
  }<% } %>

};

module.exports = mongoose.model('User', UserSchema);
