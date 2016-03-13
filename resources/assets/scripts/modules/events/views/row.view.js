'use strict'

import app from '../../../core/app'
import template from '../templates/row.template.hbs'
import RowModel from '../models/model'
import account from '../../account/models/model'
import moment from 'moment'
import _ from 'underscore'
import urls from 'services/urls'
import { pluck, some } from 'underscore'

export default app.ItemView.extend({
    template: template,

    model: RowModel,

    ui: {
        attend: '.js-attend',
        commentText: '.js-comment-text',
        commentSend: '.js-comment-send',
        commentServerError: '.js-comment-server-error'
    },

    events: {
        'click @ui.attend': 'attendHandler',
        'click @ui.commentSend': 'submitHandler'
    },

    submitHandler(e) {
        const text = this.ui.commentText.val()

        this.model.comment(text)
            .done(this.commentSubmitDoneHandler)
            .fail(this.commentSubmitFailHandler)

        this.ui.commentSend.attr('disabled', true).text('Минуточку...')
        e.preventDefault()
    },

    attendHandler() {
        this.model.attend().then(() => {
            let users = this.model.get('users')
            users.push(account.toJSON())
            this.model.set({ users })
            this.render()
        })
    },

    commentSubmitDoneHandler(response) {
        this.model.set(response)
        this.render()
    },

    commentSubmitFailHandler(response) {
        this.ui.commentServerError.text(response.responseJSON.message)
    },

    initialize() {
        _.bindAll(this, 'commentSubmitDoneHandler', 'commentSubmitFailHandler')
    },

    templateHelpers() {
        const happensAt = this.model.get('happens_at')
        const relativeTime = moment(happensAt).fromNow()
        const preciseTime = moment(happensAt).calendar()

        const isPast = moment(happensAt).isBefore(new Date)

        const attendees = this.buildAttendeesList()

        const isAttendee = some(this.model.get('users'), user => account.id === user.id)

        const cantAttend = isAttendee || isPast

        return { relativeTime, preciseTime, isPast, attendees, isAttendee, cantAttend }
    },

    buildAttendeesList() {
        const users = pluck(this.model.get('users'), 'name')
        if (users.length <= 1) return ''
        return `Идут: ${users.join(', ')}`
    }
})
