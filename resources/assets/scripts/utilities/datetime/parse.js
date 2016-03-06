'use strict'

export default function (target) {
    return target ? new Date(target) : null
}
