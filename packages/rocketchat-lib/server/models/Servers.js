import _ from 'underscore';

class ModelServers extends RocketChat.models._Base {
	constructor() {
		super(...arguments);

		this.tryEnsureIndex({name: 1});
		this.tryEnsureIndex({active: 1}, {sparse: 1});
	}

	// INSERT
	create(data) {
		const server = {
			createdAt: new Date(),
			active: true,
			type: 'text'
		};

		_.extend(server, data);

		return this.insert(server);
	}

	// FIND
	findOneById(_id, options) {
		const query = {_id};

		return this.findOne(query, options);
	}

	findOneByname(name, options) {
		if (typeof name === 'string') {
			name = new RegExp(`^${ name }$`, 'i');
		}

		const query = {name};

		return this.findOne(query, options);
	}

	findOneByUserId(userId, options) {
		const query = {userIds: userId};

		return this.findOne(query, options);
	}

	// UPDATE
	setName(_id, name) {
		const update = {
			$set: {
				name
			}
		};

		return this.update(_id, update);
	}

	editServerName(_id, name) {
		const update = {
			$set: {name}
		};

		return this.update(_id, update);
	}

	setServerActive(_id, active) {
		if (active == null) {
			active = true;
		}
		const update = {
			$set: {
				active
			}
		};

		return this.update(_id, update);
	}

	setDefaultRoom(_id, roomId) {
		const update = {
			$set: {
				defaultRoom: roomId
			}
		};

		return this.update(_id, update);
	}

	addUserById(_id, userId) {
		const update = {
			$addToSet: {
				userIds: userId
			}
		};

		return this.update(_id, update);
	}

	addInvitedEmail(_id, email) {
		this.removeInvitedEmail(_id, email);

		const update = {
			$push: {
				invitedEmails: email
			}
		};

		return this.update(_id, update);
	}

	removeInvitedEmail(_id, email) {
		const update = {
			$pull: {
				invitedEmails: email
			}
		};

		return this.update(_id, update);
	}

	setAvatar(_id, avatarUrl) {
		const update = {
			$set: {
				avatarUrl
			}
		};

		return this.update(_id, update);
	}

	unsetAvatar(_id) {
		const update = {
			$unset: {
				avatarUrl: 1
			}
		};

		return this.update(_id, update);
	}

	// REMOVE
	removeById(_id) {
		return this.remove(_id);
	}
}

RocketChat.models.Servers = new ModelServers('servers');

/*
	name: String
	active: Boolean
	type: String, (text : voice)
	defaultRoom: String
	admin: String
	userIds: [String]
	invitedEmails: [String]
	avatarUrl: String
*/
