'use strict'

import app from 'core/app'
import Model from '../models/row.model'
import moment from 'moment'

export default app.Collection.extend({
    model: Model,

    comparator: model => -moment(model.get('happens_at'))
})
