Template.voiceChannels.helpers({
	isActive() {
		if (ChatSubscription.findOne({ t: { $in: ['v']}, f: { $ne: true }, open: true, rid: Session.get('openedRoom') }, { fields: { _id: 1 } }) != null) { return 'active'; }
	},

	rooms() {
		let query = {
			t: { $in: ['v']},
			open: true
		};

		if (RocketChat.settings.get('Favorite_Rooms')) {
			query.f = { $ne: true };
		}

		if (Meteor.user() && Meteor.user().settings && Meteor.user().settings.preferences && Meteor.user().settings.preferences.unreadRoomsMode) {
			query.$or = [
				{ alert: { $ne: true } }
			];
		}
		
		return ChatSubscription.find(query, { sort: {'v': 1, 'name': 1} });
	}});

Template.voiceChannels.events({
	'click .more-channels'() {
		SideNav.setFlex("listVoiceChannelsFlex");
		return SideNav.openFlex();
	}
});