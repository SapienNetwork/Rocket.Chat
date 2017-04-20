Meteor.methods({
	createPrivateVoiceChannel(name, members, readOnly = false, customFields = {}) {
		check(name, String);
		check(members, Match.Optional([String]));

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', { method: 'createPrivateVoiceChannel' });
		}

		if (!RocketChat.authz.hasPermission(Meteor.userId(), 'create-pv')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'createPrivateVoiceChannel' });
		}//*/

		return RocketChat.createRoom('pv', name, Meteor.user() && Meteor.user().username, members, readOnly, {customFields});
	}
});
