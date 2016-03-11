'use strict'

import app from 'core/app'
import urls from 'services/urls'

export default app.Model.extend({
    attend() {
        let options = {
            type: 'POST',
            url: urls.take('events/attend', this.get('id'))
        }

        if (this.filter) {
            options.data = this.filter.serialize()
        }

        return app.Model.prototype.fetch.call(this, options)
    }
})
