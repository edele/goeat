'use strict'

import padRight from '../string/pad.right'
import toString from '../to/string'
import repeat from '../string/repeat'

/**
 * Безопасное обрезание числа
 * @param num {number} Число
 * @param frac {number} Количество знаков после запятой
 * @returns {string}
 */

export default function (num, frac) {
    var base = Math.pow(10, frac),
        parts = toString(Math.round(num * base) / base).split('.')

    if (parts.length === 1) {
        parts.push(repeat('0', frac))
    } else {
        parts[1] = padRight(parts[1], frac, '0')
    }

    return parts.join('.')
}
