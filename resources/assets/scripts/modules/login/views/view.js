'use strict'

import _ from 'underscore'
import app from 'core/app'
import $ from 'jquery'
import View from 'core/views/validation.view'
import template from '../templates/template.hbs'
import Model from '../models/model'
import events from 'services/events'
import httpCodes from 'definitions/http.codes'
import binder from 'utilities/binder'
import cookies from 'js-cookie'
import accountModel from '../../account/models/model'

export default View.extend({

    tagName: 'form',

    template: template,

    ui: {
        email: '[name="email"]',
        emailTooltip: '.js-email-error',
        password: '[name="password"]',
        passwordTooltip: '.js-password-error',
        submit: '[type="submit"]',
        serverError: '.js-server-error'
    },

    events: {
        'click @ui.submit': 'submitHandler'
    },

    bindings: {
        email: { ui: 'email' },
        password: { ui: 'password' }
    },

    initialize() {
        _.bindAll(this, 'submitDoneHandler', 'submitFailHandler')

        this.model = new Model()

        this.listenTo(this.model, 'invalid', this.invalidHandler, this)
        this.listenTo(this.model, 'valid', this.validHandler, this)
    },

    onRender() {
        binder.bind(this)
    },

    onAttach() {
        this.ui.email.focus()
    },

    submitHandler(e) {
        e.preventDefault()
        if (this.model.isValid() === true) {
            this.model.save()
                .done(this.submitDoneHandler)
                .fail(this.submitFailHandler)
        }
    },

    submitDoneHandler(response) {
        events.trigger('login:hide')

        if (response.token) {
            cookies.set('token', response.token)
            events.trigger('app:start')
        } else {
            this.submitFailHandler(response)
        }
    },

    submitFailHandler(response) {
        this.ui.serverError.text('Неверная электронная почта или пароль')
    }
})
