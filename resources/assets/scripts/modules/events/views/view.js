'use strict'

import app from '../../../core/app'
import template from '../templates/template.hbs'
import RowsCollection from '../collections/rows.collection'
import ListView from './list.view.js'

export default app.LayoutView.extend({
    template: template,

    regions: {
        list: '#events-list'
    },

    onRender() {
        this.listRegion = this.getRegion('list')
        this.createList()
    },

    createList() {
        const collection = this.model.get('items')
        const listView = new ListView({ collection })

        this.listRegion.show(listView)
    }
})
