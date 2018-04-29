Meteor.startup(() => {
  if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.ravenClientDSN) {
    RavenLogger.initialize({
      client: Meteor.settings.public.ravenClientDSN,
    }, {
      trackUser: true
    });
  }
});
