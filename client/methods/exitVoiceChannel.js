Meteor.methods({
	exitVoiceChannel() {
		console.log('exitVoice');
		Session.set('openedVoiceChannel', null);
		Session.set('mostRecentRoomType', 'c');
		Twilio.Device.disconnectAll();
	}
});
