'use strict'

import app from 'core/app'
import urls from 'services/urls'
import account from '../../account/models/model'


export default app.Model.extend({
    defaults: {
        day: 'today'
    },

    url: urls.take('events'),

    initialize() {
        if (!this.get('author')) {
            this.set('author', account.toJSON())
        }
    }
})
