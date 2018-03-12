Package.describe({
	name: 'rocketchat:ui-sidenav-servers',
	version: '0.1.0',
	summary: ''
});

Package.onUse(function(api) {
	api.use([
		'ecmascript',
		'templating',
		'session',
		'reactive-var',
		'rocketchat:lib',
		'rocketchat:ui'
	]);

	api.addFiles('client/serverSidenav.html', 'client');

	api.addFiles('client/serverSidenav.js', 'client');
});
