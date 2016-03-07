'use strict'

import app from 'core/app'
import urls from 'services/urls'
import RowsCollection from '../collections/rows.collection'

export default app.Model.extend({
    url: urls.take('events'),

    parse(response) {
        return { items: new RowsCollection(response) }
    }
})
