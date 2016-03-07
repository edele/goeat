'use strict'

import app from '../../../core/app'
import template from '../templates/row.template.hbs'
import RowModel from '../models/model'
import moment from 'moment'

export default app.ItemView.extend({
    template: template,

    model: RowModel,

    templateHelpers() {
        const happensAt = this.model.get('happens_at')
        const relativeTime = moment(happensAt).fromNow()
        const preciseTime = moment(happensAt).calendar()
        const isPast = moment(happensAt).isBefore(new Date)

        return { relativeTime, preciseTime, isPast }
    }
})
