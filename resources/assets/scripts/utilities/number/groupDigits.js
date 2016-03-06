'use strict'

import toString from '../to/string'

/**
 * Метод разделяет разряды числа пробелами
 * @returns {string}
 */

export default function (num) {
    return num.toString().split(/(?=(?:\d{3})+(?:\.|$))/g).join(' ')
}
