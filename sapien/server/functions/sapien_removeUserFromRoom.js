RocketChat.sapien_removeUserFromRoom = function(rid, username) {
	let room = RocketChat.models.Rooms.findOneById(rid);
	let user = RocketChat.models.Users.findOneByUsername(username);
	
	if (room) {
		RocketChat.callbacks.run('beforeLeaveRoom', user, room);
		RocketChat.models.Rooms.removeUsernameById(rid, user.username);

		if (room.usernames.indexOf(user.username) !== -1) {
			let removedUser = user;
			RocketChat.models.Messages.createUserLeaveWithRoomIdAndUser(rid, removedUser);
		}

		if (room.t === 'l') {
			RocketChat.models.Messages.createCommandWithRoomIdAndUser('survey', rid, user);
		}

		RocketChat.models.Subscriptions.removeByRoomIdAndUserId(rid, user._id);

		Meteor.defer(function() {
			RocketChat.callbacks.run('afterLeaveRoom', user, room);
		});
	}
};
