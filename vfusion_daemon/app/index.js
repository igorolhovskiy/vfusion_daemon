const freeswitch = require('./init/freeswitch'),
    headersProcess = require('./init/fsheadersprocess'),
    log = require('./init/logger')(module),
    channel_progress = require('./lib/channel_progress');

freeswitch
    .on('esl::event::CUSTOM::**', function(e) {
        let headers = headersProcess(e.headers);
        //log("CUSTOM" + JSON.stringify(headers));
    })
    .on('esl::event::CHANNEL_HANGUP::*', function(e) {
        let headers = headersProcess(e.headers);
        //log("CHANNEL_HANGUP " + JSON.stringify(headers));
    })
    .on('esl::event::CHANNEL_ORIGINATE::*', function(e) {
        let headers = headersProcess(e.headers);
        //log("CHANNEL_ORIGINATE " + JSON.stringify(headers));
    })
    .on('esl::event::CHANNEL_CREATE::*', function(e) {
        let headers = headersProcess(e.headers);
        //log("CHANNEL_CREATE " + JSON.stringify(headers));
    })
    .on('esl::event::CHANNEL_PROGRESS::*', function(e) {
        let headers = headersProcess(e.headers);
        log("CHANNEL_PROGRESS " + JSON.stringify(headers, null, 2));
    })
    .on('esl::event::CHANNEL_BRIDGE::*', function(e) {
        let headers = headersProcess(e.headers);
        //log("CHANNEL_BRIDGE " + JSON.stringify(headers));
    })
    .on('esl::event::CHANNEL_ANSWER::*', function(e) {
        let headers = headersProcess(e.headers);
        //log("CHANNEL_ANSWER " + JSON.stringify(headers, null, 2));
});

log('VFusion daemon started');