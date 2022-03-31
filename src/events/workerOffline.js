const Discord = require('discord.js');

module.exports = {
    name: 'workerOffline',
    once: false,
    emitter: 'client.miner',
    async execute(difference, client) {
        let embed = new Discord.MessageEmbed()
            .setColor('#ad0a0a')
            .setTitle(`${difference.length > 1 ? 'Workers' : 'Worker'} offline!`)
            .setDescription(difference.toString())
            .setTimestamp(new Date().toISOString())
        client.channels.cache.get(`${process.env.WORKERSTATUSID}`).send({
            embeds: [embed]
        })
    },
};