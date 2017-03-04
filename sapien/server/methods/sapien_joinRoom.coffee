Meteor.methods
	sapien_joinRoom: (rid, username) ->

		check rid, String
		# check code, Match.Maybe(String)
		user = RocketChat.models.Users.findOneByUsername username;
		
		room = RocketChat.models.Rooms.findOneById rid

		if not room?
			throw new Meteor.Error 'error-invalid-room', 'Invalid room', { method: 'joinRoom' }

		if room.t isnt 'c' or RocketChat.authz.hasPermission(user._id, 'view-c-room') isnt true
			throw new Meteor.Error 'error-not-allowed', 'Not allowed', { method: 'joinRoom' }

		RocketChat.addUserToRoom(rid, user)
