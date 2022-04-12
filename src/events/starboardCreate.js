const logger = require('../util/logger')

module.exports = {
    name: 'starboardCreate',
    once: false,
    emitter: 'client.starboardsManager',
    async execute(data, client) {
        const channel = client.channels.cache.get(data.channelId);
        logger.info(`Starboard created in ${channel}`)
        channel.send('This channel is now a starboard')
    }
}