const {
    SlashCommandBuilder
} = require('@discordjs/builders')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('addstarboard')
        .setDescription('create a starboard in this channel')
        .addChannelOption(option => option.setName('channelid').setDescription('The channel that will be used for a starboard.').setRequired(true))
        .addStringOption(option => option.setName('emoji').setDescription('The emoji to use for the starboard').setRequired(true))
        .addNumberOption(option => option.setName('threshold').setDescription('Number of reactions before a post is added to the starboard').setRequired(true)),
    async execute(interaction, client) {
        const cID = interaction.options.getChannel('channelid')
        const emoji = interaction.options.getString('emoji')
        const threshold = interaction.options.getNumber('threshold')

        if (client.starboardsManager.starboards.find(s => s.guildID === cID)) {
            return await interaction.reply('There is already a starboard on this server!')
        }
        await interaction.deferReply()
        await client.starboardsManager.create(cID, {
            emoji: emoji,
            threshold: threshold,
            color: '3236a8'
        })
        await interaction.editReply(`Starboard created in ${cID} using ${emoji}`)
    }
}