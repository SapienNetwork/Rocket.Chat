Template.combinedVoice.helpers({
	isActive() {
		if (ChatSubscription.findOne({ t: { $in: ['v', 'pv']}, f: { $ne: true }, open: true, rid: Session.get('openedVoiceChannel') }, { fields: { _id: 1 } })) {
			return 'active';
		}
	},

	rooms() {
		const query = {
			t: { $in: ['v', 'pv']},
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

		return ChatSubscription.find(query, { sort: { 'name': 1 }});
	}});

Template.combined.events({
	'click .more-channels'() {
		SideNav.setFlex('listCombinedFlex');
		return SideNav.openFlex();
	}
});