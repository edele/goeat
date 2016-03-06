'use strict'

import toString from '../to/string'

/**
 * Chops the string into pieces with length equal `step`.
 *
 * @param {String} target The string to chopping.
 * @param {Number} step The length of piece.
 * @returns {Array} The array of pieces.
 *
 * @example
 *
 * chopRight('lorem ipsum', 5)
 * // => ['l', 'orem ', 'ipsum']
 *
 * chopRight(1234567890)
 * // => ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
 */
function chopRight(target, step) {
    let result = []
    let i
    let length

    step = step | 0
    target = toString(target)

    if (target.length === 0) {
        return []
    }

    if (step < 2) {
        return target.split('')
    }

    length = target.length

    for (i = length; i >= 0; i -= step) {
        result.unshift(target.slice(i - step < 0 ? 0 : i - step, i))
    }

    return result
}

export default chopRight
