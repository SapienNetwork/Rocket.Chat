Meteor.methods({
	openRoomByName(name) {
		check(name, String);
		foundRoom = RocketChat.models.Rooms.findOneByIdOrName(name)
		rid = foundRoom._id

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'openRoom'
			});
		}
		console.log(rid)
		return RocketChat.models.Subscriptions.openByRoomIdAndUserId(rid, 'jXWxaXjmrpT9iSAHz');
	}
});
