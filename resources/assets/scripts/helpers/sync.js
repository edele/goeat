import Backbone from 'backbone'
import $ from 'jquery'
import cookie from 'js-cookie'

const oldBackboneSync = Backbone.sync

export default function(method, model, options) {
    const token = cookie.get('token')

    if (token) {
        options.beforeSend = xhr => {
            xhr.setRequestHeader('Authorization' , `Bearer ${token}`)
        }
    }

    return oldBackboneSync.call(this, method, model, options)
}
