'use strict'

import fixed from './fixed'
import toString from '../to/string'
import chop from '../string/chop.right'

/**
 * Метод форматирует число в строку
 * Null особый тип,  не форматируется. а возвращает null
 * @param num {number} Число
 * @param frac {number} Количество знаков после запятой ( if 0 возращ целое)
 * @param sep {string} Разделитель
 * @returns {string}
 */

export default function (num, frac = null, sep = ',') {
    if (num === null) {
         return null
    }

    frac = frac | 0

    const value = frac ? fixed(num, frac) : toString(num)
    const parts = value.split('.')
    parts[0] = chop(parts[0], 3).join(' ')

    return frac === 0 ? parts[0] : parts.join(sep); // frac === 0, возвр целую часть
}
