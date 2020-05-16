#!/bin/bash

cp -f /freeswitch_config/acl.conf.xml /etc/freeswitch/autoload_configs/
cp -f /freeswitch_config/event_socket.conf.xml /etc/freeswitch/autoload_configs/

/usr/bin/freeswitch -nonat