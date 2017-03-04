const commands = {
	'sapien_logout'() {
		Meteor.logout(() => {
			return FlowRouter.go('home');
		});
	}
};

window.addEventListener('message', (e) => {
	if (RocketChat.settings.get('Iframe_Integration_receive_enable') !== true) {
		return;
	}

	if (typeof e.data !== 'object' || typeof e.data.externalCommand !== 'string') {
		return;
	}

	let origins = RocketChat.settings.get('Iframe_Integration_receive_origin');

	if (origins !== '*' && origins.split(',').indexOf(e.origin) === -1) {
		return console.error('Origin not allowed', e.origin);
	}

	const command = commands[e.data.externalCommand];
	if (command) {
		command(e.data, e);
	}
});
