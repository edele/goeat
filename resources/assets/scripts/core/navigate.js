'use strict'

import app from './app'

export default function (url, trigger = true) {
    app.History.navigate(url, { trigger })
}
