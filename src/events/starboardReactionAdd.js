const logger = require('../util/logger')

module.exports = {
    name: 'starboardReactionAdd',
    once: false,
    emitter: 'client.starboardsManager',
    async execute(emoji, message, user) {
        logger.info(`${user.username} reacted to a message with ${emoji} (message id: ${message.id}).`);
    }
}