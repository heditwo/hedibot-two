const {
    SlashCommandBuilder
} = require('@discordjs/builders')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('add 2 numbers together')
        .addNumberOption(option => option.setName('num1').setDescription('number 1').setRequired(true))
        .addNumberOption(option => option.setName('num2').setDescription('number 2').setRequired(true)),
    async execute(interaction) {
        const num1 = interaction.options.getNumber('num1')
        const num2 = interaction.options.getNumber('num2')
        await interaction.reply(`The sum is ${num1 + num2}`)
    }

}