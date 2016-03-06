'use strict'

import _ from 'underscore'
import diff from '../../utilities/object/diff'
import Backbone from 'backbone'

export default Backbone.Model.extend({
    constructor() {
        Backbone.Model.apply(this, arguments)

        /**
         * Хэш полей с ошибками
         */
        this.errors = {}

        return this
    },

    /**
     * Переопределение метода _validate модели.
     * Добавлено событие 'valid' в случае, когда при валидации все поля валидные.
     * Метод всегда будет возвращать true для того, чтобы даже невалидные данные попадали в модель.
     */
    _validate: function (attrs, options) {
        if (!options.validate || !this.validate || !this.rules) {
            return true
        }

        attrs = _.extend({}, this.attributes, attrs)

        const changed = options.all ? _.keys(this.rules) : diff(attrs, this.attributes)

        const errors = this.validate(attrs, changed, options) || {}

        _.each(changed, attr => {
            if (errors[attr]) {
                this.trigger('invalid', this, attr, errors[attr])
                this.errors[attr] = errors[attr]
            } else {
                this.trigger('valid', this, attr)
                delete this.errors[attr]
            }
        }, this)

        return true
    },

    /**
     * Метод валидирует модель. Если в объекте с ошибками модели есть ошибки,
     * то вернется этот объект, в противном случае false.
     */
    validate(attrs, changed) {
        var errors = {}

        _.each(changed, attr => this.validateAttr(attr, attrs[attr], errors))

        return _.isEmpty(errors) ? false : errors
    },

    /**
     * Метод запускает конкретную валидацию для переданного поля.
     */
    validateAttr(name, value, errors) {
        let result

        if (this.rules[name]) {
            result = this.rules[name].call(this, value)

            if (result && result.length) {
                errors[name] = result
            }
        }
    },

    /**
     * Метод, который проверяет валидна ли модель.
     */
    isValid(options) {
        this._validate({}, _.defaults({ validate: true, all: true }, options))
        return _.isEmpty(this.errors) ? true : this.errors
    }
})
