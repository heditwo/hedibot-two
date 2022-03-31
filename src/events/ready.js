const xmr = require('../util/xmr')
const logger = require('../util/logger')

module.exports = {
    name: 'ready',
    once: true,
    emitter: 'client',
    async execute(args, client) {
        logger.success(`Ready! Logged in as ${client.user.tag}`);
        await client.miner.initMonitor()
        xmr.updateXmrStatus(client)
    },
};