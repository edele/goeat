'use strict'

import _ from 'underscore'

const regex = /^\d+$/

export default function(target) {
    if (_.isUndefined(target) || _.isNull(target)) {
        return null
    }

    if (_.isString(target) && target.length === 0) {
        return null
    }

    if (!regex.test(target)) {
        return NaN
    }

    return parseInt(target, 10)
}
