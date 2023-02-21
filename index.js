const { Timer } = require('./src/Timer.js')
const FLAG = typeof exports === 'undefined'
const EXPORT_NAME = 'Timers'
;(function (exports) {
    exports.Timer = Timer    
}(FLAG ? (this[EXPORT_NAME] = {}) : exports))
