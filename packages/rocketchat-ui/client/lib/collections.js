import _ from 'underscore';

this.ChatMessage = new Mongo.Collection(null);
this.ChatRoom = new Mongo.Collection('rocketchat_room');
this.Servers = new Mongo.Collection('rocketchat_servers');
this.ChatSubscription = new Mongo.Collection('rocketchat_subscription');
this.UserRoles = new Mongo.Collection(null);
this.RoomRoles = new Mongo.Collection(null);
this.UserAndRoom = new Mongo.Collection(null);
this.CachedChannelList = new Mongo.Collection(null);
this.CachedUserList = new Mongo.Collection(null);

RocketChat.models.Users = _.extend({}, RocketChat.models.Users, Meteor.users);
RocketChat.models.Subscriptions = _.extend({}, RocketChat.models.Subscriptions, this.ChatSubscription);
RocketChat.models.Rooms = _.extend({}, RocketChat.models.Rooms, this.ChatRoom);
RocketChat.models.Messages = _.extend({}, RocketChat.models.Messages, this.ChatMessage);
RocketChat.models.Servers = _.extend({}, RocketChat.models.Servers, this.Servers);

// XXX this for anonymous read feature need to debug later
// Meteor.startup(() => {
// 	Tracker.autorun(() => {
// 		if (!Meteor.userId() && RocketChat.settings.get('Accounts_AllowAnonymousRead') === true) {
// 			this.CachedChatRoom.init();
// 			this.CachedChatSubscription.ready.set(true);
// 		}
// 	});
// });
