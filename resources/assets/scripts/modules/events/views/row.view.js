'use strict'

import app from '../../../core/app'
import template from '../templates/row.template.hbs'
import RowModel from '../models/model'
import account from '../../account/models/model'
import moment from 'moment'
import $ from 'jquery'
import { pluck, some } from 'underscore'

export default app.ItemView.extend({
    template: template,

    model: RowModel,

    ui: {
        attend: '.js-attend'
    },

    events: {
        'click @ui.attend': 'attendHandler'
    },

    attendHandler() {
        this.model.attend().then(() => {
            let users = this.model.get('users')
            users.push(account.toJSON())
            this.model.set({ users })
            this.render()
        })
    },

    templateHelpers() {
        const happensAt = this.model.get('happens_at')
        const relativeTime = moment(happensAt).fromNow()
        const preciseTime = moment(happensAt).calendar()

        const isPast = moment(happensAt).isBefore(new Date)

        const attendees = this.buildAttendeesList()

        const isAttendee = some(this.model.get('users'), user => account.id === user.id)

        return { relativeTime, preciseTime, isPast, attendees, isAttendee }
    },

    buildAttendeesList() {
        const users = pluck(this.model.get('users'), 'name')
        if (users.length <= 1) return ''
        return `Идут: ${users.join(', ')}`
    }
})
