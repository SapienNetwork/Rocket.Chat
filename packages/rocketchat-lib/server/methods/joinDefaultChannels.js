// XXX
Meteor.methods({
	joinDefaultChannels(serverId, silenced) {
		check(serverId, String);
		check(silenced, Match.Optional(Boolean));

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'joinDefaultChannels' });
		}

		this.unblock();
		return RocketChat.addUserToDefaultChannels(Meteor.user(), serverId, silenced);
	}
});
