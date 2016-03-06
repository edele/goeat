'use strict'

import app from 'core/app'
import urls from 'services/urls'
import events from 'services/events'
import { extend } from 'underscore'

const Model = app.Model.extend({
    url: urls.take('account'),

    defaults: {
        email: ''
    },

    initialize() {
        events.on('account', account => {
            this.set(account)
        }, this)
    }
})

export default new Model()
