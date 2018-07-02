import httpProxy from 'http-proxy';
import fs from 'fs';

Meteor.startup(() => {
  if (Meteor.settings && Meteor.settings.env === 'development' && Meteor.settings && Meteor.settings.localSSL === true) {    
    proxy = httpProxy.createServer({
      target: {
        host: 'localhost',
        port: process.env.PORT
      },
      ssl: {
        key: Assets.getText('localhost.key'),
        cert: Assets.getText('localhost.crt'),
      },
      ws: true,
      xfwd: true
    }).listen(9292);
    
    proxy.on("error", function() {
      console.log("HTTP-PROXY NPM MODULE ERROR: " + err);
      return;
    });
  }
})