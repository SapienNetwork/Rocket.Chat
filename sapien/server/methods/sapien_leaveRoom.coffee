Meteor.methods
	sapien_leaveRoom: (rid, username) ->

		check rid, String

		this.unblock()

		user = RocketChat.models.Users.findOneByUsername username
		room = RocketChat.models.Rooms.findOneById rid

		if room.t is 'd'
			throw new Meteor.Error 'error-not-allowed', 'Not allowed', { method: 'leaveRoom' }

		if username not in (room?.usernames or [])
			throw new Meteor.Error 'error-user-not-in-room', 'You are not in this room', { method: 'leaveRoom' }

		# If user is room owner, check if there are other owners. If there isn't anyone else, warn user to set a new owner.
		if RocketChat.authz.hasRole(user._id, 'owner', room._id)
			numOwners = RocketChat.authz.getUsersInRole('owner', room._id).fetch().length
			if numOwners is 1
				throw new Meteor.Error 'error-you-are-last-owner', 'You are the last owner. Please set new owner before leaving the room.', { method: 'leaveRoom' }

		RocketChat.sapien_removeUserFromRoom(rid, username);
