Meteor.methods({
	roomNameExists(rid, serverId) {
		check(rid, String);
		check(serverId, String);

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'roomExists'
			});
		}
		const room = RocketChat.models.Rooms.findOneByName(rid, serverId);
		return !!room;
	}
});
