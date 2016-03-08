'use strict'

import app from 'core/app'
import FormView from 'modules/form.event/views/view'
import FormModel from 'modules/form.event/models/model'
import ListView from './list.view.js'
import RowsCollection from '../collections/rows.collection'
import template from '../templates/template.hbs'

export default app.LayoutView.extend({
    template: template,

    regions: {
        list: '#events-list',
        form: '#events-form'
    },

    ui: {
        add: '.js-add'
    },

    events: {
        'click @ui.add': 'openForm'
    },

    childEvents: {
        'formEventsClose': 'closeForm',
        'formEventsSubmitted': 'formSubmitHandler',
    },

    onRender() {
        this.listRegion = this.getRegion('list')
        this.formRegion = this.getRegion('form')
        this.createList()
    },

    openForm() {
        const model = new FormModel()
        this.formView = new FormView({ model })

        this.ui.add.hide()

        this.formRegion.show(this.formView)
    },

    closeForm() {
        this.ui.add.show()
        this.formRegion.empty()
    },

    formSubmitHandler() {
        const event = this.formView.model
        this.listView.collection.add(event)
        this.listView.render()
        this.closeForm()
    },

    createList() {
        const collection = this.model.get('items')
        this.listView = new ListView({ collection })

        this.listRegion.show(this.listView)
    }
})
