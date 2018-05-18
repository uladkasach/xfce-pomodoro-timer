#!/bin/bash
CONFIG_DIRECTORY=~/pomodoro; ## store user config in the utils area
APP_DIRECTORY=$(dirname "$0");

# create the config directory if it does not already exist
if [ ! -d "$CONFIG_DIRECTORY" ]; then
    echo "CONFIG NOT DEFINED";
    exit;
fi

# get node config
NODE=$(cat $CONFIG_DIRECTORY/node_location.config); ## get path to node
if [ ! "$NODE" ];then
   echo "PLEASE DEFINE NODE LOCATION. SEE DOCS.";
   exit
fi
if [ ! -f $NODE ]; then
    echo "NODE FILE NOT FOUND. SEE DOCS.";
    exit;
fi
if [[ ! -x "$NODE" ]]; then
    echo "NODE FILE NOT EXECUTABLE. SEE DOCS.";
    exit;
fi

# define locking file and ensure we can create the file
LOCK="$CONFIG_DIRECTORY/.mutex_lock"
touch $LOCK

## post result (w/ mutex exclusion)
( flock -x 200 ## ensure that this part is not done atomically
    RESPONSE=$($NODE $APP_DIRECTORY/monitor.js $CONFIG_DIRECTORY);# run node.js and echo output instead
    echo $RESPONSE;
) 200> "$LOCK";
