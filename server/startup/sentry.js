Meteor.startup(() => {
  if (Meteor.settings && Meteor.settings.private && Meteor.settings.private.ravenServerDSN) {
    RavenLogger.initialize({
      server: Meteor.settings.private.ravenServerDSN,
    }, {
      patchGlobal: function() {
        console.log('============ Server Down ============');
        process.exit(1);
      }
    });
  }
});
