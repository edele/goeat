'use strict'

/**
 * Простая обертка над словарем.
 */

class Dictionary {
    constructor(dict = {}) {
        this.dict = dict
    }

    take(name, ...args) {
        return this.dict[name] ? this.dict[name].apply(undefined, args) : undefined
    }
}

export default Dictionary
