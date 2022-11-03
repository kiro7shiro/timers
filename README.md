# Timers

Count ticks of a loop by calling tick() repeatedly. When the threshold is reached, tick() returns true and resets. This process repeats as long as tick() is called.

### How to use:

    const { Timer } = require('./src/Timer.js')
    const frameRate = 1000 / 60
    const timer = new Timer({ threshold: frameRate })
    const handle = setInterval(function () {
        if (timer.tick()) console.log(timer)
        if (timer.count >= 17) clearInterval(handle)
    }, frameRate)