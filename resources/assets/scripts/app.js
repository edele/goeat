'use strict'

import Application from './root/application'
import Backbone from 'backbone'
import account from 'modules/account/models/model'
import events from './services/events'
import sync from 'helpers/sync'
import Marionette from 'core/app'
import moment from 'moment'

import './helpers/templates'
import './core/interceptor'
import './root/router'

Backbone.sync = sync
moment.locale('ru')

const app = new Application()

function isOnSingleEventPath() {
    return /^\/events\/[0-9]/.test(location.pathname)
}

account.fetch()
    .done(response => {
        events.trigger('account', response).trigger('app:start')
        Marionette.navigate('/events')
    })
    .fail(response => {
        if (isOnSingleEventPath()) {
            events.trigger('app:start')
        } else {
            events.trigger('app:start').trigger('login:show')
        }
    })

window.app = app
