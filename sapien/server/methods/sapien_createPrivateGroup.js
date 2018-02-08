Meteor.methods({
  sapien_createPrivateGroup: function(name, usernames, readOnly, customFields) {
    var owner;
    if (readOnly == null) {
      readOnly = false;
    }
    if (customFields == null) {
      customFields = {};
    }
    check(name, String);
    check(usernames, Match.Optional([String]));
    owner = RocketChat.models.Users.findOneByUsername(usernames[0]);
    if (!owner) {
      throw new Meteor.Error('error-invalid-user', "Invalid user", {
        method: 'sapien_createPrivateGroup'
      });
    }
    if (!RocketChat.authz.hasPermission(owner._id, 'create-p')) {
      throw new Meteor.Error('error-not-allowed', "Not allowed", {
        method: 'sapien_createPrivateGroup'
      });
    }
    return RocketChat.createRoom('p', name, owner.username, usernames, readOnly, {
      customFields: customFields
    });
  }
});

