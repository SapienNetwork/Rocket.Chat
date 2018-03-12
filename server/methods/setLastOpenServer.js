Meteor.methods({
	setLastOpenServer(serverId) {
		check(serverId, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'setLastOpenServer'
			});
		}

		return RocketChat.models.Users.setLastOpenServer(Meteor.userId(), serverId);
	}
});
