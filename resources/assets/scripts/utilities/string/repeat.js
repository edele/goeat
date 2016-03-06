'use strict'

import toString from '../to/string'

export default function (target, count) {
    var result = ''

    target = toString(target)
    count = count | 0

    if (target.length === 0) {
        return result
    }

    for (; count > 0; count >>>= 1, target += target) {
        if ((count & 1) === 1) {
            result += target
        }
    }
    return result
}
