'use strict'

import app from 'core/app'
import urls from 'services/urls'

export default app.Model.extend({
    attend() {
        let options = {
            type: 'POST',
            url: urls.take('events/attend', this.get('id'))
        }

        return app.Model.prototype.fetch.call(this, options)
    },

    comment(text) {
        let options = {
            type: 'POST',
            url: urls.take('events/comment', this.get('id')),
            data: { text }
        }

        return app.Model.prototype.fetch.call(this, options)
    }
})
