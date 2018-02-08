Meteor.methods({
  sapien_hideDirectMessage: function(username1, username2) {
    var me, rid, to;
    check(username1, String);
    check(username2, String);
    if (!username1) {
      throw new Meteor.Error('error-invalid-user', "Invalid user", {
        method: 'createDirectMessage'
      });
    }
    if (!username2) {
      throw new Meteor.Error('error-invalid-user', "Invalid user", {
        method: 'createDirectMessage'
      });
    }
    if (username1 === username2) {
      throw new Meteor.Error('error-invalid-user', "Invalid user", {
        method: 'createDirectMessage'
      });
    }
    me = RocketChat.models.Users.findOneByUsername(username1);
    to = RocketChat.models.Users.findOneByUsername(username2);
    if (!me) {
      throw new Meteor.Error('error-invalid-user', "Invalid user", {
        method: 'createDirectMessage'
      });
    }
    if (!to) {
      throw new Meteor.Error('error-invalid-user', "Invalid user", {
        method: 'createDirectMessage'
      });
    }
    rid = [me._id, to._id].sort().join('');
    return RocketChat.models.Subscriptions.hideByRoomIdAndUserId(rid, me._id);
  }
});

