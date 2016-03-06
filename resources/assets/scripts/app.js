'use strict'

import Application from './root/application'
import Backbone from 'backbone'
import account from 'modules/account/models/model'
import events from './services/events'
import sync from 'helpers/sync'

import './helpers/templates'
import './core/interceptor'
import './root/router'

Backbone.sync = sync

const app = new Application()

account.fetch().done(response => {
    events.trigger('app:start').trigger('account', response)
})

window.app = app
