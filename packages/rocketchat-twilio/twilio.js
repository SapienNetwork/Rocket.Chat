Meteor.methods({
	conference(user,room){

		$.getJSON('http://20364771.ngrok.io/token')
		    .done(function (data) {
		      log('Got a token.');
		      console.log('Token: ' + data.token);

		      // Setup Twilio.Device
		      Twilio.Device.setup(data.token);

		      Twilio.Device.ready(function (device) {
		        log('Twilio.Device Ready!');
		        document.getElementById('call-controls').style.display = 'block';
		      });

		      Twilio.Device.error(function (error) {
		        log('Twilio.Device Error: ' + error.message);
		      });

		      Twilio.Device.connect(function (conn) {
		        log('Successfully established call!');
		        document.getElementById('button-call').style.display = 'none';
		        document.getElementById('button-hangup').style.display = 'inline';
		      });

		      Twilio.Device.disconnect(function (conn) {
		        log('Call ended.');
		        document.getElementById('button-call').style.display = 'inline';
		        document.getElementById('button-hangup').style.display = 'none';
		      });

		      Twilio.Device.incoming(function (conn) {
		        log('Incoming connection from ' + conn.parameters.From);
		        var archEnemyPhoneNumber = '+12099517118';

		        if (conn.parameters.From === archEnemyPhoneNumber) {
		          conn.reject();
		          log('It\'s your nemesis. Rejected call.');
		        } else {
		          // accept the incoming connection and start two-way audio
		          conn.accept();
		        }
		      });

		      setClientNameUI(data.identity);

		      var params = {
			    To: '+13032509782'
			  };

			  console.log('Calling ' + params.To + '...');
			  Twilio.Device.connect(params);

		    })
	    .fail(function () {
	      log('Could not get a token from server!');
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