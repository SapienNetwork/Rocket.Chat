Meteor.methods
	openVoiceChannel2: (name) ->
		if !Meteor.userId()
			return false
		foundRoom = RocketChat.models.Rooms.findOneByIdOrName(name)
		rid = foundRoom._id
		ChatSubscription.update {
			rid: rid
			'u._id': Meteor.userId()
		}, $set: open: true
	