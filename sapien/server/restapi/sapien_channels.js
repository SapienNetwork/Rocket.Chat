//Returns the channel IF found otherwise it will return the failure of why it didn't. Check the `statusCode` property
function findChannelById({ roomId, checkedArchived = true }) {
	if (!roomId || !roomId.trim()) {
		throw new Meteor.Error('error-roomid-param-not-provided', 'The parameter "roomId" is required');
	}

	const room = RocketChat.models.Rooms.findOneById(roomId, { fields: RocketChat.API.v1.defaultFieldsToExclude });

	if (!room || room.t !== 'c') {
		throw new Meteor.Error('error-room-not-found', `No channel found by the id of: ${roomId}`);
	}

	if (checkedArchived && room.archived) {
		throw new Meteor.Error('error-room-archived', `The channel, ${room.name}, is archived`);
	}

	return room;
}

RocketChat.API.v1.addRoute('sapien.channels.setDefault', { authRequired: true }, {
	post: function() {
		const findResult = findChannelById({ roomId: this.bodyParams.roomId });
		
		const res = RocketChat.models.Rooms.saveDefaultById(findResult._id, 'true');
		
		return RocketChat.API.v1.success({
			channel: RocketChat.models.Rooms.findOneById(findResult._id, { fields: RocketChat.API.v1.defaultFieldsToExclude })
		});
	}
});

RocketChat.API.v1.addRoute('sapien.channels.create', { authRequired: true }, {
	post: function() {
		if (!RocketChat.authz.hasPermission(this.userId, 'create-p')) {
			return RocketChat.API.v1.unauthorized();
		}

		if (!this.bodyParams.name) {
			return RocketChat.API.v1.failure('Body param "name" is required');
		}

		if (this.bodyParams.customFields && !(typeof this.bodyParams.customFields === 'object')) {
			return RocketChat.API.v1.failure('Body param "customFields" must be an object if provided');
		}

		let readOnly = false;
		if (typeof this.bodyParams.readOnly !== 'undefined') {
			readOnly = this.bodyParams.readOnly;
		}

		let id;
		Meteor.runAsUser(this.userId, () => {
			id = Meteor.call('createChannel', this.bodyParams.name, this.bodyParams.members ? this.bodyParams.members : [], readOnly, this.bodyParams.customFields);
		});

		return RocketChat.API.v1.success({
			channel: RocketChat.models.Rooms.findOneById(id.rid, { fields: RocketChat.API.v1.defaultFieldsToExclude })
		});
	}
});