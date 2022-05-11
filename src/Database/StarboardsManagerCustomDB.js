//required because i'm using a third party library for a starboard

const StarboardsManager = require('discord-starboards')
const StarboardSchema = require('./Schema/Starboard')

class StarboardsManagerCustomDb extends StarboardsManager {

    async getAllStarboards() {
        let allStarboards = []
        let starboards = await StarboardSchema.find() //empty filter means find all 
        for (const starboard of starboards) {
            allStarboards.push(starboard.starboard)
        }
        return allStarboards
    }

    async saveStarboard(data) {
        await StarboardSchema.create({
            starboard: data
        })
    }

    async deleteStarboard(channelId, emoji) {
        await StarboardSchema.deleteOne({
            channelId: channelId,
            emoji: emoji
        })
    }
}

module.exports = StarboardsManagerCustomDb