const Discord = require('discord.js')

class Post {
    constructor(url, title, description, timestamp, authorTrades, author) {
        this.url = url
        this.title = title
        this.description = description
        this.timestamp = timestamp
        this.authorTrades = authorTrades
        this.author = author
    }

    createEmbed() {
        this.embed = new Discord.MessageEmbed()
            .setColor('#007cbf')
            .setTitle(this.title)
            .setDescription(this.description)
            .setTimestamp(this.timestamp)
            .setFooter({
                text: `u/${this.author}, ${this.authorTrades}`
            })
            .setURL(this.url)
    }

}

module.exports = Post