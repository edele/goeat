'use strict'

import Model from 'core/models/validation.model'
import app from 'core/app'
import urls from 'services/urls'
import regexes from 'definitions/regexes'

export default Model.extend({
    url: urls.take('account/login'),

    defaults: {
        email: null,
        password: null
    },

    rules: {
        email: function (value) {
            if (!value || !value.length) {
                return 'Не указана эл.&nbsp;почта.'
            }

            if (!regexes.email.test(value)) {
                return 'Неверный формат эл.&nbsp;почты.'
            }
        },

        password: function (value) {
            if (!value || !value.length) {
                return 'Не указан пароль.'
            }
        }
    }
})
