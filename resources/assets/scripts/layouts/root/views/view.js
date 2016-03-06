'use strict'

import app from 'core/app'
import template from '../templates/template.hbs'

export default app.LayoutView.extend({
    template: template,

    regions: {
        main: '#main'
    }
})
