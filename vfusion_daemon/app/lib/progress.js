const log = require('../init/logger')(module),
      request = require('urllib'),
      commonBody = require('../lib/common');

let progress = (headers) => {

    let vtiger_url_buff = new Buffer.from(headers['variable_vtiger_url'], 'base64');
    let vtiger_url = vtiger_url_buff.toString('ascii');

    let requestBody = commonBody(headers);

    requestBody['callstatus'] = 'call_ringing';
    requestBody['number'] = headers['variable_dialed_user'] || headers['Caller-Destination-Number'];

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