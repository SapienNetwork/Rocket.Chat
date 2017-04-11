Template.voice_welcome.helpers
	title: ->
		return RocketChat.settings.get 'Layout_Voice_Title'
	body: ->
		return RocketChat.settings.get 'Layout_Voice_Body'
