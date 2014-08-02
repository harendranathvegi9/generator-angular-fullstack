'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
<% if(filters.mail) { %>
router.post('/confirm', controller.confirmMail);
router.get('/sendConfirmMail', auth.isAuthenticated(), controller.sendMailconfirmationMail);
router.post('/sendPwdResetMail', controller.sendPwdResetMail);
router.post('/changeResetedPassword', controller.changeResetedPassword);
<% } %>
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
module.exports = router;
