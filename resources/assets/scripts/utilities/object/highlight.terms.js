'use strict'

import highlight from '../string/highlight.terms'
import {mapObject, isString, isNumber} from 'underscore'

export default function highlightTermsInObject(params = {}) {

    const data = params.data
    const term = params.term

    return mapObject(data, val => {
        if (isString(val) || isNumber(val)) {
            return highlight({ string: String(val), term })
        }

        return val
    })
}
