'use strict'

import Backbone from 'backbone'
import handler from '../helpers/handler'

export default Backbone.Collection.extend({
    fetch() {
        const xhr = Backbone.Collection.prototype.fetch.apply(this, arguments)

        return xhr.always(handler)
    }
})
