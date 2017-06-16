Meteor.methods({
	openVoiceChannel(name) {
		if (!Meteor.userId()) {
			return false;
		}
		let foundRoom = RocketChat.models.Rooms.findOneByIdOrName(name);
		let rid = foundRoom._id;
		console.log(rid);
		console.log(Meteor.userId());
		return RocketChat.models.Subscriptions.openByRoomIdAndUserId( rid,Meteor.userId());
	}
});
		//subscription = RocketChat.models.Subscriptions.createWithRoomAndUser(rid, Meteor.userId());
		//ChatSubscription.update {
		//	rid: rid
		//	'u._id': Meteor.userId()
		//}, $set: open: true