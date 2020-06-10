const log = require('../init/logger')(module);

let hangup = (headers) => {

    let requestBody = {
        'callstatus' : 'call_end',
        'timestamp' : headers['Event-Date-Timestamp'],
        'uuid': headers['variable_vtiger_call_uuid'] || headers['variable_call_uuid'],
        'direction': headers['Call-Direction'],
    }

    // Get callStatus
    let callStatus = headers['variable_endpoint_disposition'];

    switch (callStatus) {
        case 'ANSWER':
            callStatus = 'answered';
            break;
    }
    requestBody['status'] = callStatus;
    // End callStatus

    // Time section
    requestBody['time'] = {
        'duration' : headers['variable_duration'],
        'answered' : headers['variable_billsec']
    };
    // End Time

    // Sorce section
    requestBody['src'] = {
        'name': headers['Caller-Caller-ID-Name'],
        'number' : headers['Caller-Caller-ID-Number']
    }
    // End source section

    // Last Seen
    requestBody['last_seen'] = {
        'name' : headers['variable_last_sent_callee_id_name'],
        'number' : headers['variable_last_sent_callee_id_number'],
        'uuid' : headers['Other-Leg-Unique-ID']
    }
    // End last seen

    if (typeof(headers['variable_vtiger_record_path']) !== 'undefined'
        && typeof(headers['variable_vtiger_record_path']) !== 'undefined') {

    }

    log(JSON.stringify(requestBody, null, 2));
}

module.exports = hangup;