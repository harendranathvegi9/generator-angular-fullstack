'use strict';

var sendmail = require('./../mail.helper.js').sendmail;

module.exports = function(recipient, callback){
    
    var locals = {
      name: recipient.name,
      COMPANY: 'angular-fullstack',
      PWDRESET_URL : 'http://localhost:9000/pwdreset/',
      PWDRESETCODE : recipient.passwordResetCode
    };

    sendmail('password_reset', recipient, 'Password reset', locals, callback);

  };