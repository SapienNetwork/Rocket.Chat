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
		'underscore',
		'rocketchat:lib',
		'rocketchat:ui'
	]);

	api.addFiles('client/accountBox.html', 'client');
	api.addFiles('client/combined.html', 'client');
	api.addFiles('client/chatRoomItem.html', 'client');
	api.addFiles('client/channels.html', 'client');
	api.addFiles('client/channelsAnonymous.html', 'client');
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
	api.addFiles('client/voiceChannels.html', 'client')
	api.addFiles('client/listVoiceChannelsFlex.html', 'client');
	api.addFiles('client/voiceChatRoomItem.html', 'client');




	api.addFiles('client/accountBox.js', 'client');
	api.addFiles('client/combined.js', 'client');
	api.addFiles('client/chatRoomItem.js', 'client');
	api.addFiles('client/channels.js', 'client');
	api.addFiles('client/channelsAnonymous.js', 'client');
	api.addFiles('client/createCombinedFlex.js', 'client');
	api.addFiles('client/directMessages.js', 'client');
	api.addFiles('client/listChannelsFlex.js', 'client');
	api.addFiles('client/listCombinedFlex.js', 'client');
	api.addFiles('client/listPrivateGroupsFlex.js', 'client');
	api.addFiles('client/privateGroups.js', 'client');
	api.addFiles('client/privateGroupsFlex.js', 'client');
	api.addFiles('client/sideNav.js', 'client');
	api.addFiles('client/starredRooms.js', 'client');
	api.addFiles('client/toolbar.js', 'client');
	api.addFiles('client/unreadRooms.coffee', 'client');
	api.addFiles('client/voiceChannels.coffee', 'client');
	api.addFiles('client/listVoiceChannelsFlex.coffee', 'client');
	api.addFiles('client/voiceChatRoomItem.coffee', 'client');
});

Npm.depends({
	'less': 'https://github.com/meteor/less.js/tarball/8130849eb3d7f0ecf0ca8d0af7c4207b0442e3f6',
	'less-plugin-autoprefix': '1.4.2'
});
