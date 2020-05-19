const log = require('../init/logger')(module);

let bridge = (headers) => {

    if (typeof(headers['variable_dialed_user']) == 'undefined') {
        log("variable_dialed_user is not set!");
        log(JSON.stringify(headers, null, 2));
        return;
    }

    let requestBody = {
        'callstatus' : 'call_answered',
        'timestamp' : headers['Event-Date-Timestamp'],
        'uuid': headers['Bridge-B-Unique-ID'],
        'number': headers['variable_dialed_user']
    }
    log(JSON.stringify(requestBody, null, 2));
}

module.exports = bridge;