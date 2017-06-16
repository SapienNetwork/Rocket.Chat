Meteor.methods({
	createVoiceChannel(name, members, readOnly = false, customFields = {}) {
		check(name, String);
		check(members, Match.Optional([String]));

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'createVoiceChannel' });
		}

		if (!RocketChat.authz.hasPermission(Meteor.userId(), 'create-v')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'createVoiceChannel' });
		}//*/

		return RocketChat.createRoom('v', name, Meteor.user() && Meteor.user().username, members, readOnly, {customFields});
	}
});
