const {
    SlashCommandBuilder
} = require('@discordjs/builders')
const {
    MessageEmbed
} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('getworkers')
        .setDescription('get list of all workers from the process wallet and send it in the designated worker channel'),
    async execute(interaction, client) {
        await interaction.deferReply({
            ephemeral: true
        })
        let workers = await client.miner.getWorkers()
        let embed = new MessageEmbed()
            .setTitle(`${workers.length} workers online.`)
            .setDescription(workers)
            .setColor('#0fa316')
        interaction.followup.send({
            embeds: [embed]
        })
    }
}