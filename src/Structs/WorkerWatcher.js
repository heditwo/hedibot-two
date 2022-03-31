const axios = require('axios')
const logger = require('../util/logger')
const {
    Collection
} = require('discord.js')
const EventEmitter = require('events')

class WorkerWatcher extends EventEmitter {
    constructor(api, wallet) {
        super()
        this.api = api
        this.wallet = wallet
    }

    async getWorkers() {
        let workerNames = await axios.get(`${this.api}/miner/${this.wallet}/identifiers`)
        return workerNames.data.sort()
    }

    async getHashrates() {
        let hashrates = new Collection()
        let workerNames = await this.getWorkers()
        for (let i = 0; i < workerNames.length; i++) {
            let worker = await axios.get(`${this.api}/miner/${this.wallet}/stats/${workerNames[i]}`)
            hashrates.set(workerNames[i], worker.data.hash2.toFixed(2))
        }
        return hashrates
    }

    async initMonitor() {
        this.workers = await this.getWorkers()

        logger.info('miner monitor initialized')
        setTimeout(this.monitor.bind(this), 10 * 1000, this.workers)
    }

    async monitor() {
        let newWorkers = await this.getWorkers()


        if (newWorkers.length == this.workers.length) {
            // workers are the same, do nothing and continue
        }

        if (newWorkers.length > this.workers.length) { // there is 1 or more new workers
            let difference = this.workers.filter(x => !newWorkers.includes(x)).concat(newWorkers.filter(x => !this.workers.includes(x)))
            this.workers = newWorkers
            this.emit('workerOnline', difference)
        }

        if (newWorkers.length < this.workers.length) { // 1 or more workers has gone offline
            let difference = this.workers.filter(x => !newWorkers.includes(x))
            this.workers = newWorkers
            this.emit('workerOffline', difference)
        }
        setTimeout(this.monitor.bind(this), 10 * 1000, this.workers)
    }
}

module.exports = WorkerWatcher