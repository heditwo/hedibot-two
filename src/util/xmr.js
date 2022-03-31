//coinmarketcap init
require('dotenv').config()
const CoinMarketCap = require('coinmarketcap-api')
const coinClient = new CoinMarketCap(process.env.COINAPIKEY)


const getXmrPrice = async () => {
    let price = await coinClient.getQuotes({
        symbol: 'XMR',
        convert: 'USD'
    })
    return price.data.XMR.quote.USD.price.toFixed(2).toString()
}

const updateXmrStatus = async (client) => {
    let xmrPrice = await getXmrPrice()
    client.user.setActivity(`XMR: $${xmrPrice}`, {
        type: 'WATCHING'
    })
    setTimeout(updateXmrStatus, 60 * 1000 * 5, client)
}

module.exports = {
    getXmrPrice,
    updateXmrStatus
}