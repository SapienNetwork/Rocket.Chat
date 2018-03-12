Meteor.methods({
	createPrivateGroup(name, serverId, members, readOnly = false, customFields = {}, extraData = {}) {
		check(name, String);
		check(serverId, String);
		check(members, Match.Optional([String]));

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'createPrivateGroup' });
		}

		if (!RocketChat.authz.hasPermission(Meteor.userId(), 'create-p')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'createPrivateGroup' });
		}

		// validate extra data schema
		check(extraData, Match.ObjectIncluding({
			tokenpass: Match.Maybe({
				require: String,
				tokens: [{
					token: String,
					balance: String
				}]
			})
		}));

		return RocketChat.createRoom('p', name, serverId, Meteor.user() && Meteor.user().username, members, readOnly, {customFields, ...extraData});
	}
});
