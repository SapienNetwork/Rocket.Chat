Meteor.methods({
	setupTwilio(user,room){
		HTTP.call('GET', 'http://7993b0a5.ngrok.io/token', function(error, res) {
		  var token;
		  if (error) {
		    console.log(error);
		  } else {
		    token = (JSON.parse(res.content)).token;
		    Twilio.Device.setup(token);
		  }
		});
		



		/*let TWILIO_ACCOUNT_SID = 'AC61eac57feb19b425c0f891c95438e936';
		let TWILIO_AUTH_TOKEN = 'd696899ae4edf3d2c7105cfe0f39b8c8';
		let TWILIO_TWIML_APP_SID = 'AP4a8238ce832743fcf860218ca2e47875';
		let TWILIO_CALLER_ID = '+14156662628';
		let twilio = Meteor.npmRequire('twilio');
		twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
		var identity = user;
  
  		var capability = new twilio.Capability(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);
  		capability.allowClientOutgoing(TWILIO_TWIML_APP_SID);
  		capability.allowClientIncoming(identity);
  		var token = capability.generate();
  		//twilioClient.setup(token);

		var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
		//*/
		/*client.messages.create({
		    body: 'Hello from Node',
		    to: '+13032509782',  // Text this number
		    from: TWILIO_CALLER_ID // From a valid Twilio number
		}, function(err, message) {
		    if(err) {
		        console.error(err.message);
		    }
		});//*/



		/*let twiml = new twilio.TwimlResponse();
		console.log('conference');



		twiml.dial(function(dialNode) {
		  	dialNode.conference(room, {
		      startConferenceOnEnter: true
		    });
		});

		var params = {
      		To: '+13032509782'
    	};//*/


	}
});
