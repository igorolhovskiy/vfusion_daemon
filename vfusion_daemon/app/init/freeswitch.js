const esl = require('modesl'),
      options = require('../config/freeswitch'),
      toArray = require('lodash/toArray');

let events = [],
    conn = createConnection();

module.exports = {
    on: function () {
        events.push(toArray(arguments));
        return conn.on.apply(conn, arguments);
    },
    api: function () {
        return conn.api.apply(conn, arguments);
    },
    bgapi: function () {
        return conn.bgapi.apply(conn, arguments);
    }
};

function createConnection() {
    let conn = new esl.Connection(options.host, options.port, options.password);

    conn.socket.on('close', reconnect);

    conn.on('error', (err) => {
        console.error('%s FreeSwitch error: %s', new Date(), err);
        reconnect();
    });

    conn.on('esl::ready', () => {
        conn.subscribe(options.subscription, () => {
            console.log('Freeswitch and subscriptions are ready');
        });
    });

    events.forEach(args => {
        conn.on.apply(conn, args);
    });

    return conn;
}

function reconnect() {
    if (reconnect.timer) {
        clearTimeout(reconnect.timer);
    }

    reconnect.timer = setTimeout( () => {
        console.log('Reconnecting FreeSwitch');
        conn = createConnection();
    }, options.reconnect_seconds * 1000);
}
