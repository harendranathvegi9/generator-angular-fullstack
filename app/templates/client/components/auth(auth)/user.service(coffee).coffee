'use strict'

angular.module '<%= scriptAppName %>'
.factory 'User', ($resource) ->
  $resource '/api/users/:id/:controller',
    id: '@_id'
  ,
    changePassword:
      method: 'PUT'
      params:
        controller: 'password'

    get:
      method: 'GET'
      params:
        id: 'me'
<% if(filters.mail) { %>
    sendConfirmationMail:
      method: 'GET'
      params:
        id:'sendConfirmMail'


    sendPwdResetMail: 
      method: 'POST'
      params:
        controller:'sendPwdResetMail'

    changeResetedPassword:
        method: 'POST',
        params:
          controller:'changeResetedPassword'
<% }%>