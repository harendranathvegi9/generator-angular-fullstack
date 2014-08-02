'use strict'

angular.module '<%= scriptAppName %>'
.controller 'ConfirmCtrl', ($scope, Auth, $location, <% if(filters.ngroute) { %>$routeParams<% } %><% if(filters.uirouter) { %>$stateParams<% } %>) ->
  $scope.errors = {}
  $scope.isLoggedIn = Auth.isLoggedIn
  confirmationMailSend = false

  <% if(filters.ngroute) { %>
  confirmCode = $routeParams.confirmCode
  <% } %><% if(filters.uirouter) { %>
  confirmCode = $stateParams.confirmCode
  <% } %>

  if confirmCode
    Auth.confirmMail confirmCode
    .then ->
      $location.path '/'
    .catch (err) ->
        $scope.errors.other = err.message

  $scope.confirm = (form) ->
    $scope.submitted = true

    if form.$valid
      Auth.confirmMail $scope.confirm.code
      .then ->
        $location.path '/'
      .catch (err) ->
        $scope.errors.other = err.message

  $scope.sendConfirmationMail = ->
    if Auth.isLoggedIn()
      confirmationMailSend = true
      Auth.sendConfirmationMail ->
        confirmationMailSend = false
        return

    return

  $scope.confirmationMailSend = ->
    confirmationMailSend
