'use strict'

import app from '../core/app'
import codes from './../definitions/http.codes.js'
import events from '../services/events'

export default function (response) {
    if (response.status === codes.ok) {
        return
    }

    if (response.status === codes.unauthorized) {
        events.trigger('login:show')

        return
    }

    if (response.status === codes.internalServerError) {
        events.trigger('error', codes.internalServerError)
    }
}
