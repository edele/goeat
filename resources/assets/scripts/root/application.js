'use strict'

import $ from 'jquery'
import _ from 'underscore'
import app from '../core/app'
import events from '../services/events'
import config from '../config'
import LoginView from 'modules/login/views/view'

export default app.Application.extend({
    initialize() {
        events
            .on('app:start', this.startHandler, this)
            .on('login:show', this.showLogin, this)
    },

    startHandler() {
        this.start()
        app.History.stop()
        app.History.start({ pushState: true })
    },

    initializeSplashRegion() {
        this.$content.empty()
        this.splashRegion = new app.Region({ el: this.$content })
    },

    showLogin() {
        app.navigate('/')
    }
})
