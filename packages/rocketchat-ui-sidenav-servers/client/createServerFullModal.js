// TODO

let oldRoute = '';
const parent = document.querySelector('.main-content');

FlowRouter.route('/create-server', {
	name: 'create-server',

	triggersEnter: [function() {
		oldRoute = FlowRouter.current().oldRoute;
	}],

	action() {
		if (parent) {
			Blaze.renderWithData(Template.fullModal, {template: 'createServer'}, parent);
		} else {
			BlazeLayout.render('main', {center: 'createServerFullModal', template: 'createServer'});
		}
	},

	triggersExit: [function() {
		Blaze.remove(Blaze.getView(document.getElementsByClassName('full-modal')[0]));
		$('.main-content').addClass('rc-old');
	}]
});

Template.createServerFullModal.events({
	'click button'() {
		oldRoute ? history.back() : FlowRouter.go('home');
	}
});

Template.createServerFullModal.onRendered(function() {
	$('.main-content').removeClass('rc-old');
});
