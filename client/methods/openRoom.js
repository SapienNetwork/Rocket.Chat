Meteor.methods({
	openRoom(rid) {
		console.log('openRoomClient');
		if (!Meteor.userId()) {
			return false;
		}

		ChatSubscription.update({
			rid: rid,
			'u._id': Meteor.userId()
		}, {
			$set: {
				open: true
			}
		});
	}
});
