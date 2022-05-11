const logger = require('../util/logger')

module.exports = {
    name: 'starboardDelete',
    once: false,
    emitter: 'client.starboardsManager',
    async execute(data, client) {
        const channel = client.channels.cache.get(data.channelId);
        logger.info(`Starboard deleted in ${channel}`)
        if (channel) channel.send('This starboard is now deleted')
    }
}