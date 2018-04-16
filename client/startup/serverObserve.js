Meteor.startup(() => {
	Servers.find().observe({
		added(data) {
			Session.set(`serverData${ data._id }`, data);
		},
		changed(data) {
			Session.set(`serverData${ data._id }`, data);
		},
		removed(data) {
			Session.set(`serverData${ data._id }`, undefined);
		}
	});
});
