'use strict'

import app from 'core/app'
import urls from 'services/urls'

export default app.Model.extend({
    defaults: {
        day: 'today'
    },

    url: urls.take('events')
})
