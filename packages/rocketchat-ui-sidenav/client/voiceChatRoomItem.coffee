Template.voiceChatRoomItem.helpers

	alert: ->
		if FlowRouter.getParam('_id') isnt this.rid or not document.hasFocus()
			return this.alert


	userStatus: ->
		userStatus = RocketChat.roomTypes.getUserStatus(this.t, this.rid);
		return 'status-' + (userStatus or 'offline')

	name: ->
		return this.name

	roomIcon: ->
		return RocketChat.roomTypes.getIcon this.t

	active: ->
		if Session.get('openedVoiceChannel') is this.rid
			return 'active'

	canLeave: ->
		roomData = Session.get('roomData' + this.rid)

		return false unless roomData

		if (roomData.cl? and not roomData.cl) or roomData.t is 'd'
			return false
		else
			return true

	route: ->
		return RocketChat.roomTypes.getRouteLink @t, @

	isMuted: ->
		return (Session.get('muteVoiceChannel')==true)


Template.chatRoomItem.rendered = ->
	if not (FlowRouter.getParam('_id')? and FlowRouter.getParam('_id') is this.data.rid) and not this.data.ls and this.data.alert is true
		KonchatNotification.newRoom(this.data.rid)

Template.voiceChatRoomItem.events

	'click .mute-microphone': ->
		Session.set('muteVoiceChannel',true)
		twilioConnection.mute(true)
		#console.log(twilioConnection.isMuted())

	'click .un-mute-microphone': ->
		Session.set('muteVoiceChannel',false)
		twilioConnection.mute(false)
		#console.log(twilioConnection.isMuted())

	'click .open-room': (e) ->
		menu.close()

	'click .exit-voice-channel': (e) ->
		e.stopPropagation()
		e.preventDefault()
		console.log 'exit'
		Meteor.call 'exitVoiceChannel'


	'click .hide-room': (e) ->
		e.stopPropagation()
		e.preventDefault()

		rid = this.rid
		name = this.name

		warnText = switch this.t
			when 'c' then 'Hide_Room_Warning'
			when 'p' then 'Hide_Group_Warning'
			when 'd' then 'Hide_Private_Warning'
			when 'v' then 'Hide_Voice_Warning'

		swal {
			title: t('Are_you_sure')
			text: if warnText then t(warnText, name) else ''
			type: 'warning'
			showCancelButton: true
			confirmButtonColor: '#DD6B55'
			confirmButtonText: t('Yes_hide_it')
			cancelButtonText: t('Cancel')
			closeOnConfirm: true
			html: false
		}, ->
			if FlowRouter.getRouteName() in ['channel', 'group', 'direct'] and Session.get('openedRoom') is rid
				FlowRouter.go 'home'

			Meteor.call 'hideRoom', rid, (err) ->
				if err
					handleError(err)
				else
					if rid is Session.get('openedRoom')
						Session.delete('openedRoom')

	'click .leave-room': (e) ->
		e.stopPropagation()
		e.preventDefault()

		rid = this.rid
		name = this.name

		warnText = switch
			when this.t == 'c' then 'Leave_Room_Warning'
			when this.t == 'p' then 'Leave_Group_Warning'
			when this.t == 'd' then 'Leave_Private_Warning'
			when this.t == 'v' then 'Leave_Voice_Warning'
		swal {
			title: t('Are_you_sure')
			text: t(warnText, name)
			type: 'warning'
			showCancelButton: true
			confirmButtonColor: '#DD6B55'
			confirmButtonText: t('Yes_leave_it')
			cancelButtonText: t('Cancel')
			closeOnConfirm: false
			html: false
		}, (isConfirm) ->
			if isConfirm
				Meteor.call 'leaveRoom', rid, (err) ->
					if err
						swal {
							title: t('Warning')
							text: handleError(err, false)
							type: 'warning'
							html: false
						}

					else
						swal.close()
						if FlowRouter.getRouteName() in ['channel', 'group', 'direct'] and Session.get('openedRoom') is rid
							FlowRouter.go 'home'

						RoomManager.close rid
			else
				swal.close()
