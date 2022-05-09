const axios = require('axios')
const {
    SlashCommandBuilder
} = require('@discordjs/builders')
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('restart my heroku dyno'),
    async execute(interaction) {
        await interaction.reply({
            content: 'Restarting',
            ephemeral: true
        })
        axios.delete('https://api.heroku.com/apps/hedibot/dynos', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.heroku+json; version=3',
                'Authorization': 'Bearer ' + process.env.HEROKUTOKEN
            }
        })
    }
}