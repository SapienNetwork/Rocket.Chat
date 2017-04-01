Template.voiceChannels.helpers
	isActive: ->
		return 'active' if ChatSubscription.findOne({ t: { $in: ['v']}, f: { $ne: true }, open: true, rid: Session.get('openedRoom') }, { fields: { _id: 1 } })?

	rooms: ->
		query =
			t: { $in: ['v']},
			open: true

		if RocketChat.settings.get 'Favorite_Rooms'
			query.f = { $ne: true }

		if Meteor.user()?.settings?.preferences?.unreadRoomsMode
			query.alert =
				$ne: true
		
		return ChatSubscription.find query, { sort: 'v': 1, 'name': 1 }

Template.voiceChannels.events
	'click .more-channels': ->
		SideNav.setFlex "listVoiceChannelsFlex"
		SideNav.openFlex()
