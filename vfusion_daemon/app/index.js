const freeswitch = require('./init/freeswitch'),
    headersProcess = require('./init/fsheadersprocess'),
    log = require('./init/logger')(module),
    callRinging = require('./lib/progress'),
    callAnswer = require('./lib/bridge');

freeswitch
    .on('esl::event::CHANNEL_PROGRESS::*', function(e) {
        let headers = headersProcess(e.headers);
        if (typeof(headers['variable_vtiger_url']) === 'undefined') {
            return;
        }
        callRinging(headers);
    })
    .on('esl::event::CHANNEL_BRIDGE::*', function(e) {
        let headers = headersProcess(e.headers);
        if (typeof(headers['variable_vtiger_url']) === 'undefined') {
            return;
        }
        callAnswer(headers);
    });

log('VFusion daemon started');