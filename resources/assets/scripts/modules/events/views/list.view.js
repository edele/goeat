'use strict'

import app from 'core/app'
import childView from '../views/row.view'
import template from '../templates/list.template.hbs'

export default app.CompositeView.extend({
    childView,

    template,

    childViewContainer: '#events-list-container'
})
