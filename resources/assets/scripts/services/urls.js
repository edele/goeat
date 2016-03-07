'use strict'

import Dictionary from 'core/dictionary'
import config from 'config'

const path = config.apiPath

const urls = {
    'account': () => `${path}/account`,
    'account/login': () => `${path}/start`,
    'events': () => `${path}/events`
}

export default new Dictionary(urls)
