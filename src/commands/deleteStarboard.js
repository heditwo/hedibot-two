const {
    SlashCommandBuilder
} = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletestarboard')
        .setDescription('delete the starboard in a channel')
        .addChannelOption(option => option.setName('channelid').setDescription('The channel that will be used for a starboard.').setRequired(true))
        .addStringOption(option => option.setName('emoji').setDescription('The emoji to use for the starboard').setRequired(true)),
    async execute(interaction, client) {
        const cID = interaction.options.getChannel('channelid')
        const emoji = interaction.options.getString('emoji')
        await interaction.deferReply()
        await client.starboardsManager.delete(cID.id, emoji)
        await interaction.editReply(`Starboard deleted in ${cID}`)
    }
}