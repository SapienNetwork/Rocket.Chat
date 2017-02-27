Meteor.methods
	sapien_hideDirectMessage: (username1, username2) ->
		check username1, String
		check username2, String

		if not username1
			throw new Meteor.Error 'error-invalid-user', "Invalid user", { method: 'createDirectMessage' }

		unless username2
			throw new Meteor.Error 'error-invalid-user', "Invalid user", { method: 'createDirectMessage' }

		if username1 == username2
			throw new Meteor.Error 'error-invalid-user', "Invalid user", { method: 'createDirectMessage' }

		me = RocketChat.models.Users.findOneByUsername username1
		to = RocketChat.models.Users.findOneByUsername username2

		if not me
			throw new Meteor.Error 'error-invalid-user', "Invalid user", { method: 'createDirectMessage' }

		if not to
			throw new Meteor.Error 'error-invalid-user', "Invalid user", { method: 'createDirectMessage' }

		rid = [me._id, to._id].sort().join('')
		RocketChat.models.Subscriptions.hideByRoomIdAndUserId rid, me._id
