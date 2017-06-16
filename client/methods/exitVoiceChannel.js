Meteor.methods({
	exitVoiceChannel() {
		//console.log('exitVoice');
		
		if(FlowRouter.getRouteName() === 'voice'){
			if(Session.get('openedRoom')){
				FlowRouter.goToRoomById(Session.get('openedRoom'));
			}else{
				FlowRouter.go('home');
			}
		}
		Session.set('openedVoiceChannel', null);
		Session.set('mostRecentRoomType', 'c');
		Twilio.Device.disconnectAll();
	}
});
