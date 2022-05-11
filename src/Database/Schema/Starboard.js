const mongoose = require('mongoose')

// const StarboardSchema = new mongoose.Schema({
//     channelId: String,
//     guildId: String,
//     options: {
//         emoji: String,
//         starBotMsg: Boolean,
//         selfStar: Boolean,
//         attachments: Boolean,
//         resolveImageUrl: Boolean,
//         threshold: Number,
//         color: String,
//         allowNsfw: Boolean,
//         ignoredChannels: [String],
//         handleMessageDelete: Boolean
//     }
// })

const StarboardSchema = new mongoose.Schema({
    starboard: Object
})

module.exports = {
    StarboardSchema
}