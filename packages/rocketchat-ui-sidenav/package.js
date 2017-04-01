Package.describe({
	name: 'rocketchat:ui-sidenav',
	version: '0.1.0',
	// Brief, one-line summary of the package.
	summary: '',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.use([
		'ecmascript',
		'templating',
		'coffeescript',
		'underscore',
		'rocketchat:lib',
		'rocketchat:ui'
	]);

	api.addFiles('client/accountBox.html', 'client');
	api.addFiles('client/combined.html', 'client');
	api.addFiles('client/chatRoomItem.html', 'client');
	api.addFiles('client/channels.html', 'client');
	api.addFiles('client/createCombinedFlex.html', 'client');
	api.addFiles('client/directMessages.html', 'client');
	api.addFiles('client/listChannelsFlex.html', 'client');
	api.addFiles('client/listCombinedFlex.html', 'client');
	api.addFiles('client/listPrivateGroupsFlex.html', 'client');
	api.addFiles('client/privateGroups.html', 'client');
	api.addFiles('client/privateGroupsFlex.html', 'client');
	api.addFiles('client/sideNav.html', 'client');
	api.addFiles('client/starredRooms.html', 'client');
	api.addFiles('client/toolbar.html', 'client');
	api.addFiles('client/unreadRooms.html', 'client');
	api.addFiles('client/userStatus.html', 'client');

	api.addFiles('client/accountBox.coffee', 'client');
	api.addFiles('client/combined.coffee', 'client');
	api.addFiles('client/chatRoomItem.coffee', 'client');
	api.addFiles('client/channels.coffee', 'client');
	api.addFiles('client/createCombinedFlex.coffee', 'client');
	api.addFiles('client/directMessages.coffee', 'client');
	api.addFiles('client/listChannelsFlex.coffee', 'client');
	api.addFiles('client/listCombinedFlex.coffee', 'client');
	api.addFiles('client/listPrivateGroupsFlex.coffee', 'client');
	api.addFiles('client/privateGroups.coffee', 'client');
	api.addFiles('client/privateGroupsFlex.coffee', 'client');
	api.addFiles('client/sideNav.coffee', 'client');
	api.addFiles('client/starredRooms.coffee', 'client');
	api.addFiles('client/toolbar.js', 'client');
	api.addFiles('client/unreadRooms.coffee', 'client');
	api.addFiles('side-nav/accountBox.html', 'client');
	api.addFiles('side-nav/combined.html', 'client');
	api.addFiles('side-nav/chatRoomItem.html', 'client');
	api.addFiles('side-nav/channels.html', 'client');
	api.addFiles('side-nav/createCombinedFlex.html', 'client');
	api.addFiles('side-nav/directMessages.html', 'client');
	api.addFiles('side-nav/listChannelsFlex.html', 'client');
	api.addFiles('side-nav/listCombinedFlex.html', 'client');
	api.addFiles('side-nav/listPrivateGroupsFlex.html', 'client');
	api.addFiles('side-nav/privateGroups.html', 'client');
	api.addFiles('side-nav/privateGroupsFlex.html', 'client');
	api.addFiles('side-nav/sideNav.html', 'client');
	api.addFiles('side-nav/starredRooms.html', 'client');
	api.addFiles('side-nav/toolbar.html', 'client');
	api.addFiles('side-nav/unreadRooms.html', 'client');
	api.addFiles('side-nav/userStatus.html', 'client');
	api.addFiles('side-nav/voiceChannels.html', 'client')
	api.addFiles('side-nav/listVoiceChannelsFlex.html', 'client');
	api.addFiles('side-nav/voiceChatRoomItem.html', 'client');

	api.addFiles('side-nav/accountBox.coffee', 'client');
	api.addFiles('side-nav/combined.coffee', 'client');
	api.addFiles('side-nav/chatRoomItem.coffee', 'client');
	api.addFiles('side-nav/channels.coffee', 'client');
	api.addFiles('side-nav/createCombinedFlex.coffee', 'client');
	api.addFiles('side-nav/directMessages.coffee', 'client');
	api.addFiles('side-nav/listChannelsFlex.coffee', 'client');
	api.addFiles('side-nav/listCombinedFlex.coffee', 'client');
	api.addFiles('side-nav/listPrivateGroupsFlex.coffee', 'client');
	api.addFiles('side-nav/privateGroups.coffee', 'client');
	api.addFiles('side-nav/privateGroupsFlex.coffee', 'client');
	api.addFiles('side-nav/sideNav.coffee', 'client');
	api.addFiles('side-nav/starredRooms.coffee', 'client');
	api.addFiles('side-nav/toolbar.js', 'client');
	api.addFiles('side-nav/unreadRooms.coffee', 'client');
	api.addFiles('side-nav/voiceChannels.coffee', 'client');
	api.addFiles('side-nav/listVoiceChannelsFlex.coffee', 'client');
	api.addFiles('side-nav/voiceChatRoomItem.coffee', 'client');
});

Npm.depends({
	'less': 'https://github.com/meteor/less.js/tarball/8130849eb3d7f0ecf0ca8d0af7c4207b0442e3f6',
	'less-plugin-autoprefix': '1.4.2'
});
