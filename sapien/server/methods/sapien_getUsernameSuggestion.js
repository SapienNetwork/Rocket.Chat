var slug, usernameIsAvaliable;

slug = function(text) {
  text = slugify(text, '.');
  return text.replace(/[^0-9a-z-_.]/g, '');
};

usernameIsAvaliable = function(username) {
  if (username.length < 1) {
    return false;
  }
  if (username === 'all') {
    return false;
  }
  return !RocketChat.models.Users.findOneByUsername({
    $regex: new RegExp("^" + username + "$", "i")
  });
};

this.generateSuggestion = function(user) {
  var email, first, index, item, last, nameParts, service, services, username, usernames, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4;
  usernames = [];
  username = void 0;
  if (Meteor.settings["public"].sandstorm) {
    usernames.push(user.services.sandstorm.preferredHandle);
  }
  if (Match.test(user != null ? user.name : void 0, String)) {
    if (RocketChat.settings.get('UTF8_Names_Slugify')) {
      usernames.push(slug(user.name));
    } else {
      usernames.push(user.name);
    }
    nameParts = user != null ? (_ref = user.name) != null ? _ref.split(' ') : void 0 : void 0;
    if (nameParts.length > 1) {
      first = nameParts[0];
      last = nameParts[nameParts.length - 1];
      if (RocketChat.settings.get('UTF8_Names_Slugify')) {
        usernames.push(slug(first[0] + last));
        usernames.push(slug(first + last[0]));
      } else {
        usernames.push(first[0] + last);
        usernames.push(first + last[0]);
      }
    }
  }
  if (((_ref1 = user.profile) != null ? _ref1.name : void 0) != null) {
    if (RocketChat.settings.get('UTF8_Names_Slugify')) {
      usernames.push(slug(user.profile.nwame));
    } else {
      usernames.push(user.profile.name);
    }
  }
  if (user.services != null) {
    services = _.map(user.services, function(service) {
      return _.values(_.pick(service, 'name', 'username', 'firstName', 'lastName'));
    });
    services = _.uniq(_.flatten(services));
    for (_i = 0, _len = services.length; _i < _len; _i++) {
      service = services[_i];
      if (RocketChat.settings.get('UTF8_Names_Slugify')) {
        usernames.push(slug(service));
      } else {
        usernames.push(service);
      }
    }
  }
  if (((_ref2 = user.emails) != null ? _ref2.length : void 0) > 0) {
    _ref3 = user.emails;
    for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
      email = _ref3[_j];
      if ((email.address != null) && email.verified === true) {
        usernames.push(slug(email.address.replace(/@.+$/, '')));
      }
    }
    _ref4 = user.emails;
    for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
      email = _ref4[_k];
      if ((email.address != null) && email.verified === true) {
        usernames.push(slug(email.address.replace(/(.+)@(\w+).+/, '$1.$2')));
      }
    }
  }
  usernames = _.compact(usernames);
  for (_l = 0, _len3 = usernames.length; _l < _len3; _l++) {
    item = usernames[_l];
    if (usernameIsAvaliable(item)) {
      username = item;
      break;
    }
  }
  if (usernames.length === 0 || usernames[0].length === 0) {
    usernames.push('user');
  }
  index = 0;
  while (username == null) {
    index++;
    if (usernameIsAvaliable(usernames[0] + '-' + index)) {
      username = usernames[0] + '-' + index;
    }
  }
  if (usernameIsAvaliable(username)) {
    return username;
  }
  return void 0;
};

RocketChat.generateUsernameSuggestion = generateSuggestion;

Meteor.methods({
  getSapienUsernameSuggestion: function(user) {
    return generateSuggestion(user);
  }
});

