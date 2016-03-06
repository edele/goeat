'use strict'

import app from 'core/app'
import template from '../templates/template.hbs'
import cookie from 'js-cookie'

export default app.ItemView.extend({
    tagName: 'ul',

    className: 'menu header__menu',

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
        app.navigate('/')
    }
})
