require('dotenv').config()
const fs = require('node:fs')
const {
    Client,
    Collection,
    Intents
} = require('discord.js');
const StarboardsManager = require('discord-starboards')
const WorkerWatcher = require('./Structs/WorkerWatcher')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

client.commands = new Collection()

//initialize the starboards
const manager = new StarboardsManager(client)
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
        eval(event.emitter).once(event.name, (...args) => event.execute(...args, client));
    } else {
        eval(event.emitter).on(event.name, (...args) => event.execute(...args, client));
    }
}






client.login(process.env.TOKEN);