Meteor.methods
	sapien_createDirectMessage: (username1, username2) ->

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

		if !RocketChat.authz.hasPermission me._id, 'create-d'
			throw new Meteor.Error 'error-not-allowed', 'Not allowed', { method: 'createDirectMessage' }

		rid = [me._id, to._id].sort().join('')

		now = new Date()

		# Make sure we have a room
		RocketChat.models.Rooms.upsert
			_id: rid
		,
			$set:
				usernames: [me.username, to.username]
			$setOnInsert:
				t: 'd'
				msgs: 0
				ts: now

		# Make user I have a subcription to this room
		upsertSubscription =
			$set:
				ts: now
				ls: now
				open: true
			$setOnInsert:
				name: to.username
				t: 'd'
				alert: false
				unread: 0
				u:
					_id: me._id
					username: me.username
		if to.active is false
			upsertSubscription.$set.archived = true

		RocketChat.models.Subscriptions.upsert
			rid: rid
			$and: [{'u._id': me._id}] # work around to solve problems with upsert and dot
		,
			upsertSubscription

		# Make user the target user has a subcription to this room
		RocketChat.models.Subscriptions.upsert(
			rid: rid
			$and: [{'u._id': to._id}] # work around to solve problems with upsert and dot
		,
			$setOnInsert:
				name: me.username
				t: 'd'
				open: false
				alert: false
				unread: 0
				u:
					_id: to._id
					username: to.username
               )

               #open room for other user
		RocketChat.models.Subscriptions.openByRoomIdAndUserId rid, to._id

		return {
			rid: rid
		}

DDPRateLimiter.addRule
	type: 'method'
	name: 'createDirectMessage'
	connectionId: -> return true
, 10, 60000
