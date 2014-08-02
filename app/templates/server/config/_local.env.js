'use strict';

// Environment variables that grunt will set when the server starts locally. Use for your api keys, secrets, etc.
// You will need to set these on the server you deploy to.
//
// This file should not be tracked by git.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "<%= _.slugify(appname) + '-secret' %>",
  // Control debug level for modules using visionmedia/debug
  DEBUG: '', <% if (filters.facebookAuth) { %>

  FACEBOOK_ID: 'app-id',
  FACEBOOK_SECRET: 'secret',<% } if (filters.twitterAuth) { %>

  TWITTER_ID: 'app-id',
  TWITTER_SECRET: 'secret',<% } if (filters.googleAuth) { %>

  GOOGLE_ID: 'app-id',
  GOOGLE_SECRET: 'secret', <% }  if (filters.mail) { %>
  MAIL_SERVICE: "", // sets automatically host, port and connection security settings
  MAIL_USER: "",
  MAIL_PASS: "",
  MAIL_FROM_NAME: "Modular Fullstack",
  MAIL_FROM_ADDRESS: "modular@fullstack.org" <% } %>
};
