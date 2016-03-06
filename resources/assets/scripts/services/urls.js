'use strict'

import Dictionary from 'core/dictionary'
import config from 'config'

const path = config.apiPath

const urls = {
    'account': () => `${path}/account`,
    'account/login': () => `${path}/start`
}

export default new Dictionary(urls)
