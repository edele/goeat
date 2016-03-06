'use strict'

import $ from 'jquery'
import _ from 'underscore'
import app from '../core/app'
import events from '../services/events'
import config from '../config'
import LoginView from 'modules/login/views/view'
import AccountView from 'modules/account/views/view'
import accountModel from 'modules/account/models/model'
import QuestionaryListView from 'modules/questionaries/views/view'

export default app.Application.extend({
    initialize() {
        this.$body = $('body')
        this.$main = $('#main')
        this.$overlay = $('.overlay')
        this.$content = this.$overlay.find('.overlay__content')

        this.on('start', this.startHandler, this)

        events
            .on('app:start', this.start, this)
            .on('login:show', code => this.showSplashView(new LoginView()), this)
            .on('login:hide', this.hideSplashView, this)
            .on('account', this.showAccountView, this)
    },

    startHandler() {
        this.initializeSplashRegion()
        this.initializeAccountRegion()
        this.hideSplashView()

        app.History.stop()
        app.History.start({ pushState: true })
    },

    initializeSplashRegion() {
        this.$content.empty()
        this.splashRegion = new app.Region({ el: this.$content })
    },

    showSplashView(view) {
        if (this.splashRegion === undefined) {
            this.initializeSplashRegion()
        }

        this.splashRegion.show(view)
        this.$overlay.removeClass('is-hidden')
        this.$body.addClass('overflow-hidden')
    },

    hideSplashView() {
        this.$overlay.addClass('is-hidden')
        this.$body.removeClass('overflow-hidden')
        this.splashRegion.empty()
    }
})
