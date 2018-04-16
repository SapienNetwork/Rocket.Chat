Meteor.publish('servers', function servers() {
	if (!this.userId) {
		return this.ready();
	}

	const pub = this;
	const cursor = RocketChat.models.Servers.find(
		{userIds: this.userId}
	).observeChanges({
		added(_id, record) {
			return pub.added('rocketchat_servers', _id, record);
		},
		changed(_id, record) {
			return pub.changed('rocketchat_servers', _id, record);
		},
		removed(_id) {
			return pub.removed('rocketchat_servers', _id);
		}
	});
	this.onStop(() => cursor.stop());
	return this.ready();
});
