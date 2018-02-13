Meteor.methods({
  sapien_inviteUserToRoom : function(rid, username) {
  const room = RocketChat.models.Rooms.findOneById(rid);
  console.log("ROOM")
  console.log(room);
  
  if (!RocketChat.authz.hasRole(Meteor.userId(), 'owner', rid)) {
    throw new Meteor.Error('error-not-allowed', 'Not allowed', {
          method: 'inviteUserToRoom'
    });
  }//*/

  
  if(room.invitedUsers){
    RocketChat.models.Rooms.update({
      _id: rid
    }, {
      $push: {
        'invitedUsers': username
      }
    });
  } else{
    RocketChat.models.Rooms.update({
      _id: rid
    }, {
      $set: {
        'invitedUsers': [username]
      }
    });
  }//*/

  return true;
  }
});
