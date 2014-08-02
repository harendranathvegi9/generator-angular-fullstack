'use strict';

angular.module('<%= scriptAppName %>')
  .controller('ConfirmCtrl', function ($scope, Auth, $location, <% if(filters.ngroute) { %>$routeParams<% } %><% if(filters.uirouter) { %>$stateParams<% } %>) {
    $scope.errors = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    var confirmationMailSend = false;

    <% if(filters.ngroute) { %>
    var confirmCode = $routeParams.confirmCode;
    <% } %><% if(filters.uirouter) { %>
    var confirmCode = $stateParams.confirmCode;
    <% } %>

    if (confirmCode) {
      Auth.confirmMail(confirmCode)
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
    }

    $scope.confirm = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.confirmMail($scope.confirm.code)
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.sendConfirmationMail = function() {

      if(Auth.isLoggedIn()) {
        confirmationMailSend = true;
        Auth.sendConfirmationMail(function(){
          confirmationMailSend = false;
        });
      }
    };

    $scope.confirmationMailSend = function() {
      return confirmationMailSend;
    };


  });
