'use strict';

angular.module('<%= scriptAppName %>')
  <% if(filters.ngroute) { %>.config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })<% if(filters.mail) { %>
      .when('/confirm', {
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl',
      })
      .when('/confirm/:confirmCode', {
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl'
      })
      .when('/pwdreset', {
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl',
      })
      .when('/pwdreset/:pwdresetCode', {
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl'
      })<% } %>;
  });<% } %><% if(filters.uirouter) { %>.config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })<% if(filters.mail) { %>
      .state('confirm', {
        url: '/confirm',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl',
      })
      .state('confirmWithCode', {
        url: '/confirm/:confirmCode',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl'
      })
      .state('askForPwdReset', {
        url: '/pwdreset',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl',
      })
      .state('resetPwd', {
        url: '/pwdreset/:pwdresetCode', 
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl'
      })<% } %>;
  });<% } %>