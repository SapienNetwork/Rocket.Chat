Meteor.methods({
	sapien_createPrivateGroup(name, serverId, usernames, readOnly, customFields) {
		check(name, String);
		check(usernames, Match.Optional([String]));

		if (readOnly == null) {
			readOnly = false;
		}

		if (customFields == null) {
			customFields = {};
		}

		const owner = RocketChat.models.Users.findOneByUsername(usernames[0]);
		if (!owner) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'sapien_createPrivateGroup'
			});
		}
		if (!RocketChat.authz.hasPermission(owner._id, 'create-p')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', {
				method: 'sapien_createPrivateGroup'
			});
		}
		return RocketChat.createRoom('p', name, serverId, owner.username, usernames, readOnly, {customFields});
	}
});
