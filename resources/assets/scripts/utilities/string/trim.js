'use strict'

import whitespace from '../whitespaces'
import toString from '../to/string'

export default function (target,...chars) {
    target = toString(target)

    if (target.length === 0) {
        return ''
    }

    chars = chars.length ? chars : whitespace

    return target.replace(new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'ig'), '')
}
