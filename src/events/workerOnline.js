const Discord = require('discord.js');

module.exports = {
    name: 'workerOnline',
    once: false,
    emitter: 'client.miner',
    async execute(difference, client) {
        let embed = new Discord.MessageEmbed()
            .setColor('#0fa316')
            .setTitle(`${difference.length > 1 ? 'Workers' : 'Worker'} online!`)
            .setDescription(difference.toString())
            .setTimestamp(new Date().toISOString())
        client.channels.cache.get(`${process.env.WORKERSTATUSID}`).send({
            embeds: [embed]
        })
    },
};