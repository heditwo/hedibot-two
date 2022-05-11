require('dotenv').config()
const fs = require('node:fs')
const {
    Client,
    Collection,
    Intents
} = require('discord.js');
const StarboardsManagerCustomDb = require('./Database/StarboardsManagerCustomDB')
const WorkerWatcher = require('./Structs/WorkerWatcher')
const logger = require('./util/logger')
const myIntents = new Intents(65535)
const mongoose = require('mongoose')

const client = new Client({
    intents: [myIntents]
});

client.commands = new Collection()
client.mongoose = mongoose

//initialize the starboards
const manager = new StarboardsManagerCustomDb(client, {
    storage: false
})
client.starboardsManager = manager

//initialize miner monitor
const miner = new WorkerWatcher(process.env.API, process.env.WALLET)
client.miner = miner


const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'))
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))


//command handler
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

//event handler
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        logger.info(`${event.name} event created`)
        eval(event.emitter).once(event.name, (...args) => event.execute(...args, client));
    } else {
        logger.info(`${event.name} event created`)
        eval(event.emitter).on(event.name, (...args) => event.execute(...args, client));
    }
}



//init db
client.mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    logger.success('Connection to DB successful')
}).catch(err => {
    logger.error(err.message)
})


client.login(process.env.TOKEN);