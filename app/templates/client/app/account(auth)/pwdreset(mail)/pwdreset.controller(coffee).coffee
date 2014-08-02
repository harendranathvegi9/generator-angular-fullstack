'use strict'

angular.module '<%= scriptAppName %>'
.controller 'PwdResetCtrl', ($scope, Auth, $location, <% if(filters.ngroute) { %>$routeParams<% } %><% if(filters.uirouter) { %>$stateParams<% } %>) ->
  $scope.errors = {}
  $scope.isLoggedIn = Auth.isLoggedIn
  <% if(filters.ngroute) { %>
  pwdresetCode = $routeParams.pwdresetCode
  <% } %><% if(filters.uirouter) { %>
  pwdresetCode = $stateParams.pwdresetCode
  <% } %>
  pwdResetState = 'mailform'
  $scope.pwdResetMailSend = false
  $scope.invalidResetCode = false
  $scope.unknownMailAddress = false
  pwdResetState = "passwordform"  if pwdresetCode

  $scope.sendPwdResetMail = (form) ->
    $scope.submitted = true
    $scope.unknownMailAddress = false
    if form.$valid
      $scope.pwdResetMailSend = true
      Auth.sendPwdResetMail $scope.reset.email
      .then ->
        pwdResetState = "mailsent"
        $scope.message = "Password successfully changed."
        return
      .catch (err) ->
        $scope.unknownMailAddress = true
        $scope.message = ''
        $scope.pwdResetMailSend = false
        return
    return

  $scope.changeResetedPassword = (form) ->
    $scope.submitted = true
    if form.$valid
      Auth.changeResetedPassword(pwdresetCode, $scope.user.newPassword)
      .then ->
        $scope.message = "Password successfully changed."
        $location.path "/"
        return
      .catch (err) ->
        $scope.invalidResetCode = true
        $scope.message = ""
        return
    return

  $scope.resetStateIs = (state) ->
    pwdResetState is state