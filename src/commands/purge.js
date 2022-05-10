const {
    SlashCommandBuilder
} = require('@discordjs/builders')
const logger = require('../util/logger')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('purge N amount of messages')
        .addNumberOption(option => option.setName('purge').setDescription('amount to purge').setRequired(true)),
    async execute(interaction) {
        const num1 = interaction.options.getNumber('purge')
        await interaction.deferReply({
            ephemeral: true
        })
        if (num1 < 1 || num1 > 100) {
            return await interaction.editReply('You need to input a number between 1 and 100.')
        }
        await interaction.channel.bulkDelete(num1, true).catch(async err => {
            logger.warn(err)
            return await interaction.editReply('There was an error trying to prune messages.')
        })

        return interaction.editReply(`Pruned ${num1} messages.`)
    }

}