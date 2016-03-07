'use strict'

import app from 'core/app'
import template from '../templates/template.hbs'
import events from 'services/events'

import AccountView from 'modules/account/views/view'
import accountModel from 'modules/account/models/model'

export default app.LayoutView.extend({
    template: template,

    regions: {
        main: '#main',
        account: '#header-account'
    },

    initialize() {
        events.on('account', this.renderAccount, this)
    },

    renderAccount(response) {
        accountModel.set(response)
        this.getRegion('account').show(new AccountView({ model: accountModel }))
    }
})
