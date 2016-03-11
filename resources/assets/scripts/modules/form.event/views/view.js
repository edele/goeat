'use strict'

import app from 'core/app'
import template from '../templates/template.hbs'
import moment from 'moment'
import binder from 'utilities/binder'
import _ from 'underscore'

const roundTo = (num, to) => {
    return Math.ceil(num / to) * to
}

export default app.ItemView.extend({
    template: template,

    tagName: 'form',

    ui: {
        add: '.js-add',
        serverError: '.js-server-error',
        title: '[name=title]',
        day: '[name=day]',
        hour: '[name=hour]',
        minute: '[name=minute]',
        cancel: '.js-cancel'
    },

    events: {
        'click @ui.add': 'submitHandler',
        'click @ui.cancel': 'close'
    },

    bindings: {
        title: { ui: 'title' },
        day: { ui: 'day' },
        hour: { ui: 'hour' },
        minute: { ui: 'minute' }
    },

    modelEvents: {
        'change': 'updateHappensAt'
    },

    updateHappensAt() {
        let happens_at = moment()
        happens_at.hour(this.model.get('hour'))
        happens_at.minute(this.model.get('minute'))

        if (this.model.get('day') === 'tomorrow') {
            happens_at.add(1, 'd')
        }

        happens_at = happens_at.format('YYYY-MM-DD HH:mm:00')

        this.model.set({ happens_at })
    },

    initialize() {
        _.bindAll(this, 'submitFailHandler', 'submitSuccessHandler')
        const hour = moment().hour()
        const minute = roundTo(moment().minute(), 5)
        this.model.set({ hour, minute })
        this.updateHappensAt()
    },

    templateHelpers() {
        const { hours, minutes } = this.generateTime()

        const examples = [
            'Сбор анонимных любителей опенсорса',
            'Обед в Провансе',
            'Го за шаурмой!',
            'Табы или пробелы? Мирная дискуссия в столовой на втором этаже',
            'Едет пицца, не расходимся'
        ]

        return { hours, minutes, example: examples[Math.floor(Math.random() * examples.length)] }
    },

    generateTime() {
        let hours = []
        let minutes = []
        const currentMinute = moment().minute()
        let startMinute
        let startHour

        for (let i = 0; i < 24; i++) {
            hours.push({ label: i, value: i})
        }

        for (let i = 0; i < 60; i += 5) {
            minutes.push({ label: i, value: i})
        }

        return { hours, minutes }
    },

    submitHandler(e) {
        e.preventDefault()

        if (this.model.isValid() === true) {
            this.model.save()
                .done(this.submitSuccessHandler)
                .fail(this.submitFailHandler)
            this.ui.add.attr('disabled', true).text('Минуточку...')
        }
    },

    submitFailHandler(response) {
        this.ui.serverError.text(response.responseJSON.message)
        this.ui.add.attr('disabled', false).text('Добавить')
    },

    submitSuccessHandler(response) {
        this.model.set(response)
        this.triggerMethod('formEventsSubmitted')
    },

    onRender() {
        binder.bind(this)
    },

    close(e) {
        if (e.preventDefault) e.preventDefault()
        this.triggerMethod('formEventsClose')
    }
})
