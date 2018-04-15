Meteor.methods({
  sapien_createDirectMessage: function(username1, username2) {
    var me, now, rid, to, upsertSubscription;
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
    if (!RocketChat.authz.hasPermission(me._id, 'create-d')) {
      throw new Meteor.Error('error-not-allowed', 'Not allowed', {
        method: 'createDirectMessage'
      });
    }
    rid = [me._id, to._id].sort().join('');
    now = new Date();
    RocketChat.models.Rooms.upsert({
      _id: rid
    }, {
      $set: {
        usernames: [me.username, to.username]
      },
      $setOnInsert: {
        t: 'd',
        msgs: 0,
        ts: now
      }
    });
    upsertSubscription = {
      $set: {
        ts: now,
        ls: now,
        open: true
      },
      $setOnInsert: {
        name: to.username,
        t: 'd',
        alert: false,
        unread: 0,
        u: {
          _id: me._id,
          username: me.username
        }
      }
    };
    if (to.active === false) {
      upsertSubscription.$set.archived = true;
    }
    RocketChat.models.Subscriptions.upsert({
      rid: rid,
      $and: [
        {
          'u._id': me._id
        }
      ]
    }, upsertSubscription);
    RocketChat.models.Subscriptions.upsert({
      rid: rid,
      $and: [
        {
          'u._id': to._id
        }
      ]
    }, {
      $setOnInsert: {
        name: me.username,
        t: 'd',
        open: false,
        alert: false,
        unread: 0,
        u: {
          _id: to._id,
          username: to.username
        }
      }
    });
    RocketChat.models.Subscriptions.openByRoomIdAndUserId(rid, to._id);
    return {
      rid: rid
    };
  }
});

DDPRateLimiter.addRule({
  type: 'method',
  name: 'createDirectMessage',
  connectionId: function() {
    return true;
  }
}, 10, 60000);

