'use strict';

angular.module('<%= scriptAppName %>')
  .controller('SettingsCtrl', function ($scope, Auth) {
    $scope.errors = {};
    $scope.isMailconfirmed = Auth.isMailconfirmed;

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
