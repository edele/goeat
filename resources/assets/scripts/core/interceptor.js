'use strict'

/**
 * Перехват кликов по ссылкам
 */
import $ from 'jquery'
import app from '../core/app'

const mailTo = /^mailto/

$('body').on('click', 'a', (e) => {
    if (e.currentTarget.target !== '_blank') {
        if (!mailTo.test(e.currentTarget.href)) {
            e.preventDefault()
            app.navigate(e.currentTarget.pathname)
        }
    }
})
