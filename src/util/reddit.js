const Post = require('../Structs/Post')
const axios = require('axios')
const logger = require('./logger')

const regex = /[13]0[6-9]0[^0p]/i

const getNewestHwsSellingPosts = async () => {
    const reddit = await axios.get('https://www.reddit.com/r/hardwareswap/new.json?limit=10').catch((error) => {
        logger.error(error)
    })
    const rawPosts = reddit.data.data.children
    let posts = []

    for (const key in rawPosts) {
        if (rawPosts[key].data.link_flair_css_class == 'selling' && regex.test(rawPosts[key].data.title)) {
            posts.push(new Post(rawPosts[key].data.url, `${rawPosts[key].data.title.length > 253 ? rawPosts[key].data.title.slice(0, 253).concat('...') : rawPosts[key].data.title}`, `${rawPosts[key].data.is_self ? rawPosts[key].data.selftext.length > 253 ? rawPosts[key].data.selftext.slice(0, 253).concat('...') : rawPosts[key].data.selftext : ''}`, new Date(rawPosts[key].data.created_utc * 1000), rawPosts[key].data.author_flair_text, rawPosts[key].data.author))
        }
    }

    for (let i = 0; i < posts.length; i++) {
        posts[i].createEmbed()
    }

    return posts
}

const getDiscordPosts = async (client, hwsID) => {
    const hwsChannel = client.channels.cache.get(hwsID)
    const messages = []
    messages.push(...(await hwsChannel.messages.fetch({
        limit: 20
    })).array());
    if (messages.length === 0 || messages.length < 20) {
        return messages
    }
    for (;;) {
        const fetched = (
            await hwsChannel.messages.fetch({
                limit: 10,
                before: messages.sort((a, b) => a.id - b.id)[0].id
            })
        ).array()
        messages.push(...fetched)
        if (fetched.length < 20) break
    }
    return messages.sort((a, b) => b.id - a.id)
}

const monitor = async (client, hwsID) => {
    const forSalePosts = await getNewestHwsSellingPosts()
    const hwsBoard = await getDiscordPosts(client, hwsID)
    let posts = []

    for (const post in forSalePosts) {
        let old = false
        for (let i = 0; i < hwsBoard.length; i++) {
            if (forSalePosts[post].url == hwsBoard[i].embeds[0].url) {
                old = true
            }
        }
        if (old != true) {
            posts.push(forSalePosts[post])
            console.log(`posting ${forSalePosts[post].embed.url}`)
        }
        old = false
    }

    await client.channels.cache.get(hwsID).send({
        embeds: posts
    })
    posts = []

    setTimeout(monitor, 10 * 1000, client, hwsID)
}


module.exports = {
    getNewestHwsSellingPosts,
    getDiscordPosts,
    monitor
}