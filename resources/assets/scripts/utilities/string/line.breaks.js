'use strict'

export default function (text) {
    return text.replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>')
}
