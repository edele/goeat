'use strict'

import app from 'core/app'
import Layout from 'layouts/root/views/view'
import parse from 'utilities/number/parse'
import events from 'services/events'
import reqres from 'services/reqres'

import QuestionaryModel from '../modules/questionaries/models/model'
import QuestionaryView from '../modules/questionaries/views/view'

const defaultRoute = '/questionaries'

export default app.Object.extend({
    initialize() {
        this.layout = new Layout({ el: '#root' })
        this.layout.render()
        this.mainRegion = this.layout.getRegion('main')
    },

    other() {
        app.navigate(defaultRoute)
    },

    questionaries(page) {
        events.trigger('page', 'questionaries')
        const model = new QuestionaryModel()
        const view = new QuestionaryView({ model })
        this.mainRegion.show(view)
    }
})
