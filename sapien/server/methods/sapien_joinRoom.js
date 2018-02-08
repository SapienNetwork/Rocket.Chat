Meteor.methods({
  sapien_joinRoom: function(rid, username) {
    var room, user;
    check(rid, String);
    user = RocketChat.models.Users.findOneByUsername(username);
    room = RocketChat.models.Rooms.findOneById(rid);
    if (room == null) {
      throw new Meteor.Error('error-invalid-room', 'Invalid room', {
        method: 'joinRoom'
      });
    }
    if (room.t !== 'c' || RocketChat.authz.hasPermission(user._id, 'view-c-room') !== true) {
      throw new Meteor.Error('error-not-allowed', 'Not allowed', {
        method: 'joinRoom'
      });
    }
    return RocketChat.addUserToRoom(rid, user);
  }
});

