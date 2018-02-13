
Meteor.methods({
  sapien_leaveRoom: function(rid, username) {
    var numOwners, room, user;
    check(rid, String);
    this.unblock();
    user = RocketChat.models.Users.findOneByUsername(username);
    room = RocketChat.models.Rooms.findOneById(rid);

    if (room.t === 'd') {
      throw new Meteor.Error('error-not-allowed', 'Not allowed', {
        method: 'leaveRoom'
      });
    }
   
    if ((room != null ? room.usernames : []).indexOf(username) < 0 ){
      throw new Meteor.Error('error-user-not-in-room', 'You are not in this room', {
        method: 'leaveRoom'
      });
    }


    if (RocketChat.authz.hasRole(user._id, 'owner', room._id)) {
      numOwners = RocketChat.authz.getUsersInRole('owner', room._id).fetch().length;
      if (numOwners === 1) {
        throw new Meteor.Error('error-you-are-last-owner', 'You are the last owner. Please set new owner before leaving the room.', {
          method: 'leaveRoom'
        });
      }
    }
    return RocketChat.sapien_removeUserFromRoom(rid, username);
  }
});

