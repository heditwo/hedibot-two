module.exports = {
    name: 'starboardCreate',
    emitter: 'manager',
    async execute(data, client) {
        const channel = client.channels.cache.get(data.channelId);
        channel.send('This channel is now a starboard')
    }
}