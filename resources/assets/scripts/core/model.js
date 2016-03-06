'use strict'

import Backbone from 'backbone'
import handler from '../helpers/handler'

export default Backbone.Model.extend({
    fetch() {
        let xhr = Backbone.Model.prototype.fetch.apply(this, arguments)

        return xhr.always(handler)
    },

    save() {
        let xhr = Backbone.Model.prototype.save.apply(this, arguments)

        return xhr.always(handler)
    }
})
