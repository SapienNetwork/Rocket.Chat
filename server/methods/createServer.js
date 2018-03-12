Meteor.methods({
	async createServer(name, description) {
		check(name, String);
		check(description, Match.Optional(String));

		if (!Meteor.userId()) {
			throw new Meteor.Error('error-invalid-user', 'Invalid user', {
				method: 'createServer'
			});
		}

		if (name == null || name.trim() === '') {
			throw new Meteor.Error('error-invalid-name', 'Invalid name', {
				method: 'createServer'
			});
		}

		try {
			const data = {
				name,
				description,
				admin: Meteor.userId(),
				userIds: [Meteor.userId()],
				avatarUrl: name
			};

			const serverId = RocketChat.models.Servers.create(data);

			if (serverId) {
				RocketChat.models.Users.addServer(Meteor.userId(), serverId);
				const room = await Meteor.call('createChannel', 'general', serverId, [], false);
				return RocketChat.models.Servers.setDefaultRoom(serverId, room.rid);
			}

		} catch (error) {
			console.log(error);
			throw new Meteor.Error('error-creating-server', 'creating server', {method: 'createServer'});
		}
	}
});
