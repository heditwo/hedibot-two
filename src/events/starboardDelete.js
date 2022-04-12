module.exports = {
    name: 'starboardDelete',
    once: false,
    emitter: 'client.starboardsManager',
    async execute(data, client) {
        const channel = client.channels.cache.get(data.channelId);
        if (channel) channel.send('This starboard is now deleted')
    }
}