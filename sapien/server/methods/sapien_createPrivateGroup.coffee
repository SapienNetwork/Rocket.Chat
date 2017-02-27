Meteor.methods
    sapien_createPrivateGroup: (name, usernames, readOnly = false, customFields = {}) ->

        check name, String
        check usernames, Match.Optional([String])

        owner = RocketChat.models.Users.findOneByUsername usernames[0]

        if not owner
            throw new Meteor.Error 'error-invalid-user', "Invalid user", { method: 'sapien_createPrivateGroup'  }

        if not RocketChat.authz.hasPermission(owner._id, 'create-p')
            throw new Meteor.Error 'error-not-allowed', "Not allowed", { method: 'sapien_createPrivateGroup'  }

        return RocketChat.createRoom('p', name, owner.username, usernames, readOnly, {customFields: customFields});
