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
                return 'Йо, укажи почту!'
            }

            if (!regexes.email.test(value)) {
                return 'Это не похоже на почту :('
            }
        },

        password: function (value) {
            if (!value) {
                return 'Сюда нужно ввести пароль ↑'
            }

            if (value.length < 6) {
                return 'Неа, слишком короткий'
            }
        }
    }
})
