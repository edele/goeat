'use strict'

import app from './../core/app'
import Controller from './controller'

export default new app.Router({
    controller: new Controller(),

    appRoutes: {
        'questionaries(/)': 'questionaries',
        '*path': 'other'
    }
})
