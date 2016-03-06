'use strict'

const millisecondsPerDay = 1000 * 60 * 60 * 24

export default function (target, source) {
    return Math.ceil((target.getTime() - source.getTime()) / millisecondsPerDay)
}
