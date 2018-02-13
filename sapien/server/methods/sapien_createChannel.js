Meteor.methods({
	sapien_createChannel(name, usernames, readOnly = false, customFields = {}) {
		check(name, String);
	
		check(usernames, Match.Optional([String]));
		if(usernames.length > 0){
			owner = RocketChat.models.Users.findOneByUsername(usernames[0]);
		} else {
			owner = RocketChat.models.Users.findOneByUsername('ankit.bhatia');
		}
		if (!RocketChat.authz.hasPermission(owner._id, 'create-c')) {
			throw new Meteor.Error('error-not-allowed', 'Not allowed', { method: 'createChannel' });
		}

		return RocketChat.createRoom('c', name, owner.username, usernames, readOnly, {
  			customFields: customFields
		});
	}
});
