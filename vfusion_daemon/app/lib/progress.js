const log = require('../init/logger')(module),
      request = require('urllib');

let progress = (headers) => {

    if (typeof(headers['variable_dialed_user']) == 'undefined') {
        log("variable_dialed_user is not set!");
        log(JSON.stringify(headers, null, 2));
        return;
    }

    let vtiger_url_buff = new Buffer.from(headers['variable_vtiger_url'], 'base64');
    let vtiger_url = vtiger_url_buff.toString('ascii');

    let requestBody = {
        'callstatus' : 'call_ringing',
        'timestamp' : headers['Event-Date-Timestamp'],
        'uuid': headers['variable_vtiger_call_uuid'] || headers['variable_call_uuid'],
        'number': headers['variable_dialed_user']
    }

    // Add vtigersignature
    if (typeof(headers['variable_vtiger_api_key']) !== 'undefined') {
        let vtiger_api_key_buff = new Buffer.from(headers['variable_vtiger_api_key'], 'base64');
        requestBody['vtigersignature'] = vtiger_api_key_buff.toString('ascii');
    }

    let request_options = {
        'method' : 'POST',
        'contentType' : 'json',
        'followRedirect' : true,
        'timeout' : [3000, 5000],
        'data' : requestBody
    }

    request.request(vtiger_url, request_options);

    log(JSON.stringify(request_options, null, 2));

}

module.exports = progress;