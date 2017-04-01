Package.describe({
	name: 'rocketchat:twilio',
	version: '0.0.1',
	summary: 'exposes twilio api',
	git: ''
});

Package.onUse(function(api) {
	api.use([
		'coffeescript',
		'ecmascript',
		'templating',
		'underscore',
		'rocketchat:oembed',
		'rocketchat:lib'
	]);

	

	api.addFiles('twilio.js', 'client');
});
