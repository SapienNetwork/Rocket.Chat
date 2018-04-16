Template.serverSideNav.helpers({
	servers() {
		let servers;
		try {
			servers = Servers && Servers.find().fetch();
		} catch (e) {
			servers = [];
		}
		return servers;
	}
});

Template.serverSideNav.events({
	'click .server-item'(event) {
		event.preventDefault();
		Session.set('currentServer', this._id);
		Meteor.call('setLastOpenServer', this._id);
	},

	'click .create-server'(event) {
		event.preventDefault();
		const text = `\
		<div class='create-server'>
			<div class="rc-input__wrapper">
				<input class="rc-input__element" id='server-name' style='display: inherit;' value='' placeholder='server name'>
			</div>
			<div class="rc-input__wrapper">
				<input class="rc-input__element" id='server-description' style='display: inherit;' value='' placeholder='server description'>
			</div>
		</div>`;

		modal.open(
			{
				title: 'Create new server',
				text,
				showCancelButton: true,
				closeOnConfirm: true,
				closeOnCancel: true,
				html: true
			},
			function(isConfirm) {

				const name = document.getElementById('server-name').value;
				const description = document.getElementById('server-description').value;
				if (isConfirm !== true) {
					return;
				}

				if (!name) {
					modal.open({
						title: 'Name can not be empty',
						type: 'error',
						timer: 1000
					});
					return;
				}

				Meteor.call('createServer', name, description, err => {
					if (!err) {
						modal.open({
							title: t('Saved'),
							type: 'success',
							timer: 1000,
							showConfirmButton: false
						});
					}
				});
			}
		);
	}
});

Template.serverSideNav.onRendered(function() {});

Template.serverSideNav.onCreated(function() {});
