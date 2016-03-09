'use strict'

import app from 'core/app'
import account from 'modules/account/models/model'
import template from '../templates/template.hbs'

export default app.ItemView.extend({
    template: template,

    ui: {
        submit: '[type="submit"]',
        name: '[name="name"]',
        error: '.js-name-error'
    },

    events: {
        'click @ui.submit': 'submitHandler',
        'submit form': 'submitHandler'
    },

    submitHandler(e) {
        const name = this.ui.name.val()
        const $submit = this.ui.submit

        if (name) {
            $submit.attr('disabled', true).text('Минуточку...')
            this.ui.error.text('')

            account.set({ name })
            account.save().then(() => {
                this.triggerMethod('submittedName')
            })
        } else {
            this.ui.error.text('Мммм, поле пустое. Так нельзя. Как то тебя ведь нужно называть')
        }

        if (e.preventDefault) {
            e.preventDefault()
        }
    }
})
