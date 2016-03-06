'use strict'

export default function stripTags(target) {
    return target ? target.replace(/(<([^>]+)>)/ig, '') : ''
}
