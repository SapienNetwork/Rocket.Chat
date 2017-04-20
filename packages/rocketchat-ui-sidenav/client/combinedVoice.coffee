Template.combinedVoice.helpers
	isActive: ->
		return 'active' if ChatSubscription.findOne({ t: { $in: ['v', 'pv']}, f: { $ne: true }, open: true, rid: Session.get('openedRoom') }, { fields: { _id: 1 } })?

	rooms: ->
		query =
			t: { $in: ['v', 'pv']},
			open: true

		if RocketChat.settings.get 'Favorite_Rooms'
			query.f = { $ne: true }

		if Meteor.user()?.settings?.preferences?.unreadRoomsMode
			query.alert =
				$ne: true

		return ChatSubscription.find query, { sort: 'name': 1 }

Template.combinedVoice.events
	'click .more-channels': ->
		SideNav.setFlex "listCombinedFlex"
		SideNav.openFlex()
