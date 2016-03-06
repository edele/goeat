'use strict'

/**
 * Метод, который сравнивает два объекта и возвращает массив ключей, значениях которых
 * отличаются.
 *
 * Проход происходит по первому переданному объекту.
 */

export default function (target, source) {
    const result = []

    for (let attr in target) {
        if (target.hasOwnProperty(attr)) {
            if (target[attr] !== source[attr]) {
                result.push(attr)
            }
        }
    }

    return result
}
