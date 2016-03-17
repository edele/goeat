'use strict'

import strip from './strip.tags'

export default function (text) {
    text = strip(text)
    return text.replace(/\n{2,}/g, '<br><br>').replace(/\n/g, '<br>')
}
