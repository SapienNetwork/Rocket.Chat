
Meteor.methods({
  sapien_removeUserFromRoom: function(data) {
    var fromId, fromUser, numOwners, removedUser, room, _ref, _ref1;
    check(data, Match.ObjectIncluding({
      rid: String,
      username: String
    }));
    fromUser = RocketChat.models.Users.findOneByUsername(data.username);
    fromId = fromUser._id;
    room = RocketChat.models.Rooms.findOneById(data.rid);
    if (room.t === 'd') {
      throw new Meteor.Error('error-not-allowed', 'Not allowed', {
        method: 'removeUserFromRoom'
      });
    }
    if (_ref = data.username, __indexOf.call((room != null ? room.usernames : void 0) || [], _ref) < 0) {
      throw new Meteor.Error('error-user-not-in-room', 'User is not in this room', {
        method: 'removeUserFromRoom'
      });
    }
    removedUser = RocketChat.models.Users.findOneByUsername(data.username);
    if (RocketChat.authz.hasRole(removedUser._id, 'owner', room._id)) {
      numOwners = RocketChat.authz.getUsersInRole('owner', room._id).fetch().length;
      if (numOwners === 1) {
        throw new Meteor.Error('error-you-are-last-owner', 'You are the last owner. Please set new owner before leaving the room.', {
          method: 'removeUserFromRoom'
        });
      }
    }
    RocketChat.models.Rooms.removeUsernameById(data.rid, data.username);
    RocketChat.models.Subscriptions.removeByRoomIdAndUserId(data.rid, removedUser._id);
    if ((_ref1 = room.t) === 'c' || _ref1 === 'p') {
      RocketChat.authz.removeUserFromRoles(removedUser._id, ['moderator', 'owner'], data.rid);
    }
    fromUser = RocketChat.models.Users.findOneById(fromId);
    RocketChat.models.Messages.createUserRemovedWithRoomIdAndUser(data.rid, removedUser, {
      u: {
        _id: fromUser._id,
        username: fromUser.username
      }
    });
    return true;
  }
});

