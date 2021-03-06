'use strict'

export default function (number, one, two, five) {
    number = number < 0 ? -number : number
    number %= 100
    if (number >= 5 && number <= 20) {
        return five
    }
    number %= 10
    if (number === 1) {
        return one
    }
    if (number >= 2 && number <= 4) {
        return two
    }
    return five
}
