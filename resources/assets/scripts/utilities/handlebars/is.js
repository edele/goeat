'use strict'

export default function (left, op, right, options) {
    if (arguments.length < 3) {
        throw new Error('Handlebars Helper "is" needs 2 parameters')
    }

    if (options === undefined) {
        options = right
        right = op
        op = '==='
    }

    const operators = {
        '===': (l, r) => l === r,
        '!==': (l, r) => l !== r,
        '<': (l, r) => l < r,
        '>': (l, r) => l > r,
        '<=': (l, r) => l <= r,
        '>=': (l, r) => l >= r,
        '||': (l, r) => l || r,
        '&&': (l, r) => l && r
    }

    if (!operators[op]) {
        throw new Error(`Handlebars Helper "compare" doesn\'t know the operator "${op}"`)
    }

    let result = operators[op](left, right)

    return result ? options.fn(this) : options.inverse(this)
}
