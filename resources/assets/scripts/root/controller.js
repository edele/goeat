'use strict'

import app from 'core/app'
import Layout from 'layouts/root/views/view'
import events from 'services/events'

import LoginView from 'modules/login/views/view'

import EventsView from 'modules/events/views/view'
import EventsModel from 'modules/events/models/model'

import EventView from 'modules/events/views/row.view'
import EventModel from 'modules/events/models/row.model'

import accountModel from 'modules/account/models/model'

const defaultRoute = '/events'

export default app.Object.extend({
    initialize() {
        this.layout = new Layout({ el: '#root' })
        this.layout.render()
        this.mainRegion = this.layout.getRegion('main')
    },

    other() {
        if (accountModel.get('id')) {
            app.navigate(defaultRoute)
        } else {
            this.mainRegion.show(new LoginView())
        }
    },

    events() {
        const model = new EventsModel()

        model.fetch().then(() => {
            this.mainRegion.show(new EventsView({ model }))
        })
    },

    event(id) {
        const model = new EventModel({ id })

        model.fetch().then(() => {
            this.mainRegion.show(new EventView({ model }))
        })
    }
})
