const assert = require('assert')
const { Timer } = require('../src/Timer.js')

const frameRate = 1000 / 60

describe('timer', function () {

    it('count ticks', function (done) {
        const timer = new Timer({ threshold: frameRate, weights: [0.9, 0.1] })
        console.log(timer)
        const handle = setInterval(function () {
            if (timer.tick()) {
                clearInterval(handle)
                assert.equal(timer.count, 1)
                done()
            }
        }, frameRate)
    })

    it('count fps', function (done) {
        const timer = new Timer
        const handle = setInterval(function () {
            if (timer.tick()) {
                clearInterval(handle)
                console.log(timer)
                assert.ok(timer.rate >= frameRate * 0.9, `fps: ${timer.rate} to low.`)
                done()
            }
        }, frameRate)
    })

})