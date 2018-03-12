Meteor.startup(function() {
	Meteor.users.find({}, { fields: { name: 1, username: 1, pictures: 1, status: 1, emails: 1, phone: 1, services: 1, utcOffset: 1, lastOpenServer: 1, servers: 1 } }).observe({
		added(user) {
			Session.set(`user_${ user.username }_status`, user.status);
			Session.set('currentServer', user.lastOpenServer);
			RoomManager.updateUserStatus(user, user.status, user.utcOffset);
		},
		changed(user) {
			Session.set(`user_${ user.username }_status`, user.status);
			Session.set('currentServer', user.lastOpenServer);
			RoomManager.updateUserStatus(user, user.status, user.utcOffset);
		},
		removed(user) {
			Session.set(`user_${ user.username }_status`, null);
			Session.set('currentServer', null);
			RoomManager.updateUserStatus(user, 'offline', null);
		}
	});
});
