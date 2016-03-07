'use strict'

import app from 'core/app'
import template from '../templates/template.hbs'
import cookie from 'js-cookie'

export default app.ItemView.extend({
    tagName: 'ul',

    className: 'nav navbar-nav navbar-right',

    template: template,

    ui: {
        logout: '.js-logout'
    },

    events: {
        'click @ui.logout': 'logout'
    },

    modelEvents: {
        change : 'render'
    },

    logout() {
        cookie.remove('token')
        this.model.clear()
        app.navigate('/')
        this.destroy()
    }
})
