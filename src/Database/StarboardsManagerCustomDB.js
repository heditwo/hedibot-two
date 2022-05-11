//required because i'm using a third party library for a starboard

const StarboardsManager = require('discord-starboards')
const StarboardSchema = require('./Schema/Starboard')

//TODO: create these functions

const StarboardsManagerCustomDb = class extends StarboardsManager {
    async getAllStarboards() {
        return StarboardSchema.find() //empty filter means find all 
    }

    async saveStarboard(data) {
        console.log(data)
    }

    async deleteStarboard(data) {
        console.log(data)
    }

    async editStarboard(channelId, emoji, data) {
        console.log(channelId, emoji, data)
    }
}

module.exports = {
    StarboardsManagerCustomDb
}