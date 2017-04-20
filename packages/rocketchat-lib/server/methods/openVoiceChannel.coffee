Meteor.methods
	openVoiceChannel: (name) ->
		if !Meteor.userId()
			return false
		foundRoom = RocketChat.models.Rooms.findOneByIdOrName(name)
		rid = foundRoom._id
		console.log(rid)
		console.log(Meteor.userId())
		RocketChat.models.Subscriptions.openByRoomIdAndUserId( rid,Meteor.userId())
		#subscription = RocketChat.models.Subscriptions.createWithRoomAndUser(rid, Meteor.userId());
		#ChatSubscription.update {
		#	rid: rid
		#	'u._id': Meteor.userId()
		#}, $set: open: true
	