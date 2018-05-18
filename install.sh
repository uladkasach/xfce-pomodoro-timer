CONFIG_DIRECTORY=~/pomodoro; ## store user config in the utils area
APP_DIRECTORY=$(dirname "$0");

# create the config directory if it does not already exist
if [ ! -d "$CONFIG_DIRECTORY" ]; then
    #echo "creating configuration directory at $CONFIG_DIRECTORY";
    mkdir -p $CONFIG_DIRECTORY;
fi

# create the node_location.config file
NODE_FILE=$CONFIG_DIRECTORY/node_location.config;
if [ ! -f "$NODE_FILE" ]; then
    echo "creating node file";
    echo $(which node) >> $NODE_FILE
fi

# create the status.json file
STATUS_FILE_SOURCE=$APP_DIRECTORY/defaults/.status.json
STATUS_FILE=$CONFIG_DIRECTORY/.status.json
if [ ! -f "$STATUS_FILE" ]; then
    echo "creating status file"
    cp $STATUS_FILE_SOURCE $STATUS_FILE
fi

# create the config.json file
CONFIG_FILE_SOURCE=$APP_DIRECTORY/defaults/config.json
CONFIG_FILE=$CONFIG_DIRECTORY/config.json
if [ ! -f "$CONFIG_FILE" ]; then
    echo "creating config file"
    cp $CONFIG_FILE_SOURCE $CONFIG_FILE
fi
