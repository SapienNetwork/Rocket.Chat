// Meteor.publish('directMessages', function directMessages() {
// 	if (!this.userId) {
// 		return this.ready();
// 	}

// 	const options = {
// 		fields: {
// 			name: 1,
// 			fname: 1,
// 			t: 1,
// 			cl: 1,
// 			u: 1,
// 			usernames: 1,
// 			muted: 1,
// 			archived: 1,
// 			default: 1,
// 			ts: 1,
// 			lm: 1,
// 			multi: 1
// 		},
// 		sort: {
// 			name: 1
// 		}
// 	};

// 	const user = RocketChat.models.Users.findOneById(this.userId, {
// 		fields: {username: 1}
// 	});

// 	const query = {
// 		$or: [
// 			{t: 'd'},
// 			{usernames: user.username}
// 		]
// 	};

// 	return RocketChat.models.Rooms.find(query, options);
// });
