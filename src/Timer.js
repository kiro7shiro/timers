/**
 * Count ticks of a loop.
 */
class Timer {

    /**
     * Default config
     */
    static defaults = {
        count: 0,
        diff: 0,
        last: 0,
        rate: 0,
        ticks: 0,
        threshold: 1000, 
        weights: [0.75, 0.25]
    }

    /**
     * Returns a new timer instance.
     * @param {Object} [options]
     * @param {Number} [options.count] - preload
     * @param {Number} [options.diff] - preload
     * @param {Number} [options.last] - preload
     * @param {Number} [options.rate] - preload
     * @param {Number} [options.ticks] - preload
     * @param {Number} [options.threshold] - When to tick in milliseconds. (Default = 1000, tick every second.)
     * @param {Number[]} [options.weights] - Adjust 'ramp up' and 'ramp down' of the rate count.
     * @returns {Timer}
     */
    constructor({ count, diff, last, rate, ticks, threshold, weights } = {}) {
        Object.assign(this, Timer.defaults, arguments[0])
    }
    /**
     * Count the ticks of a loop by repeatedly calling tick().
     * If the threshold is reached it will return true and then reset
     * until the next tick is reached and so on. 
     * @param {Object} [options]
     * @param {Number} [options.now] Timestamp to use for the tick in milliseconds e.g. Date.now().
     *                               Useful if you want to use a specific time to use.
     * @param {String} [options.label] Create a sub timer with a label.
     * @param {Object} [options.options] Options for the sub timer.
     * @returns {Boolean}
     */
    tick({ now = 0 } = {}) {
        if (!now) now = Date.now()
        if (!this.last) this.last = now
        this.diff = now - this.last
        this.ticks++
        if (this.ticks + 1 === Number.MAX_SAFE_INTEGER) this.ticks = 0
        this.rate = this.rate * this.weights[0] + (this.threshold / (this.threshold / this.ticks)) * this.weights[1]
        if (this.last + this.threshold <= now) {
            this.last = now
            this.ticks = 0
            this.count++
            if (this.count + 1 === Number.MAX_SAFE_INTEGER) this.count = 0
            return true
        }
        return false
    }
}

module.exports = { Timer }