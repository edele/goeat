'use strict'

import _ from 'underscore'

const defaultGetter = function (el) {
    return el.value
}

function bind(context) {
    if (!context) {
        return
    }

    if (!context.bindings) {
        throw new Error('The bindings should be defined!')
    }

    _.each(context.bindings, function (rule, name) {
        const eventName = rule.event || 'change'
        const selector = rule.el || this._uiBindings[rule.ui]
        const getter = rule.getter || defaultGetter
        const validate = rule.validate || true
        const silent = rule.silent || false
        const that = this

        if (!selector) {
            throw new Error(`Undefined selector for '${name}' field`)
        }

        const listener = function (e) {
            that.model.set(name, getter(e.target), { validate, silent })
        }

        this.$el.on(eventName + '.bindingEvents' + this.cid, selector, listener)

    }, context)
}

function unbind(context) {
    if (!context) {
        return
    }

    if (!context.bindings) {
        throw new Error('The bindings should be defined!')
    }

    _.each(context.bindings, function (rule, name) {
        const eventName = rule.event || 'change'
        const selector = rule.el || this._uiBindings[rule.ui]

        if (!selector) {
            throw new Error('The selector should be defined!')
        }

        this.$el.off(eventName + '.bindingEvents' + this.cid, selector)

    }, context)
}

export default { bind, unbind }

