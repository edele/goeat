'use strict'

import _ from 'underscore'
import app from 'core/app'
import parse from 'utilities/number/parse'
import trim from 'utilities/string/trim'

/**
 * Базовое представление, в которое вынесена общая логика валидации карточек.
 */

export default app.ItemView.extend({
    applyBindings() {
        const that = this

        _.each(this.bindings, (rule, name) => {
            this.ui[name].on(rule.event || 'change', function () {
                const type = that.bindings[this.name].type || 'string'
                let value = this.value

                if (type === 'boolean') {
                    value = Boolean(value | 0)
                }

                if (type === 'checkbox') {
                    value = this.checked
                }

                if (type === 'number') {
                    value = parse(trim(value))
                }

                if (type === 'string') {
                    value = trim(value)
                }

                if (type === 'file') {
                    value = this.files ? this.files[0] :
                        {
                            name: this.value.match(/[^\/\\]*$/)[0],
                            size: null,
                            type: 'file/' + this.value.match(/.([a-z]+)$/)[1]
                        }
                }

                that.model.set(name, value, { validate: true })
            })
        }, this)
    },

    validHandler(model, attr) {
        const field = this.ui[attr]
        const tooltip = this.ui[attr + 'Tooltip']

        if (field) {
            field.removeClass('has-error')
        }

        if (tooltip) {
            tooltip.empty()
        }
    },

    invalidHandler(model, attr, error) {
        const field = this.ui[attr]
        const tooltip = this.ui[attr + 'Tooltip']

        if (field) {
            field.addClass('has-error')
        }
        if (tooltip) {
            tooltip.html(error)
        }
    }
})
