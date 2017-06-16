FlowRouter.goToRoomById = (roomId) => {
	const subscription = ChatSubscription.findOne({rid: roomId});
	console.log('roomRoute')
	if (subscription) {
		RocketChat.roomTypes.openRouteLink(subscription.t, subscription, FlowRouter.current().queryParams);
	}
};
