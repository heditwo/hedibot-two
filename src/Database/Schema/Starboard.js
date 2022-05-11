const mongoose = require('mongoose')

const StarboardSchema = new mongoose.Schema({
    starboard: Object
})

module.exports = mongoose.model("Starboards", StarboardSchema)