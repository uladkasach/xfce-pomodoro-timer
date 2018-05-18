# create the config directory if it does not already exist
if [ ! -d "$CONFIG_DIRECTORY" ]; then
    #echo "creating configuration directory at $CONFIG_DIRECTORY";
    mkdir -p $CONFIG_DIRECTORY;
fi

# create the node_location.config file
echo $(which node) >> node_location.config
