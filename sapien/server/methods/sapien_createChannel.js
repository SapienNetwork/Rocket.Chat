Meteor.methods({
	sapien_createChannel(name, serverId, usernames, readOnly = false, customFields = {}) {
		check(name, String);
		check(serverId, String);
		check(usernames, Match.Optional([String]));

		let owner;
		if (usernames.length > 0) {
			owner = RocketChat.models.Users.findOneByUsername(usernames[0]);
		} else {
			owner = RocketChat.models.Users.findOneByUsername('ankit.bhatia');
		}
		if (!RocketChat.authz.hasPermission(owner._id, 'create-c')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'sapien_createChannel' });
		}

		return RocketChat.createRoom('c', name, serverId, owner.username, usernames, readOnly, {customFields});
	}
});
