const freeswitch = require('./init/freeswitch'),
    headersProcess = require('./init/fsheadersprocess');

freeswitch.on('esl::event::CUSTOM::**', function(e) {
	let headers = headersProcess(e.headers);
    console.log("CUSTOM" + JSON.stringify(headers));

})  .on('esl::event::CHANNEL_HANGUP::*', function(e) {
        let headers = headersProcess(e.headers);
		console.log("CHANNEL_HANGUP " + JSON.stringify(headers));
	})
    .on('esl::event::CHANNEL_ORIGINATE::*', function(e) {
		let headers = headersProcess(e.headers);
		console.log("CHANNEL_ORIGINATE " + JSON.stringify(headers));
    })
    .on('esl::event::CHANNEL_CREATE::*', function(e) {
		let headers = headersProcess(e.headers);
		console.log("CHANNEL_CREATE " + JSON.stringify(headers));
    })
    .on('esl::event::CHANNEL_ANSWER::*', function(e) {
		let headers = headersProcess(e.headers);
		console.log("CHANNEL_ANSWER " + JSON.stringify(headers));
    });

console.log(new Date(), 'VFusion daemon started');