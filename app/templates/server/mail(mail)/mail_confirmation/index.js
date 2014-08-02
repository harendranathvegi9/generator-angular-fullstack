'use strict';

var sendmail = require('./../mail.helper.js').sendmail;

module.exports = function(recipient, callback){

    var locals = {
      name:recipient.name,
      COMPANY: 'angular-fullstack',
      CONFIRMATION_URL : 'http://localhost:9000/confirm/',
      MAILCONFIRMATIONCODE : recipient.mailConfirmationCode
    };

    sendmail('mail_confirmation', recipient, 'Activation', locals, callback);

  };